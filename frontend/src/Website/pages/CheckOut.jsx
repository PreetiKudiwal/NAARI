import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainContext } from "../../context/Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { emptyCart } from "../../Redux/Reducer/CartSlice";
import { UserLogin } from "../../Redux/Reducer/UserSlice";
import { RxCross2 } from "react-icons/rx";

export default function CheckOut() {
  const { API_BASE_URL, toastNotify } = useContext(MainContext);
  const { error, isLoading, Razorpay } = useRazorpay();
  const user = useSelector((state) => state.user.data);
  console.log(user?.shipping_address[0], "User Data");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(0);
  console.log(selectedAddress, "selectedAddress");
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //remove address start

  const removeAddress = (addressToRemove) => {
    console.log(addressToRemove);

    const data = {
      _id: user._id,
      index: addressToRemove,
    };
    axios
      .put(`${API_BASE_URL}/user/remove-address`, data)
      .then((success) => {
        console.log(success.data);
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          dispatch(
            UserLogin({
              data: success.data.user,
              token: user.token,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //remove address start

  const placeOrder = () => {
    axios
      .post(API_BASE_URL + "/order/order-place", {
        user_id: user._id,
        order_total: cart.totalFinelPrice,
        payment_mode: selectedPayment,
        shipping_details: user?.shipping_address[selectedAddress],
      })
      .then((success) => {
        if (success.data.status == 1) {
          if (selectedPayment === 0) {
            dispatch(emptyCart());
            console.log(success, "Order placed successfully");
            navigate(`/thankyou/${success.data.order_id}`);
          } else {
            console.log(success, "Razorpay Order");
            handlePayment(
              success.data.razorpay_order.order_id,
              success.data.razorpay_order.razorpay_order
            );
          }
        }
      })
      .catch((error) => {
        console.error("Order placing failed:", error);
      });
  };

  const handlePayment = async (order_id, razorpay_order_id) => {
    const options = {
      key: "rzp_test_EUY1YwTsZFcSqN", // Enter the Key ID generated from the Dashboard
      currency: "INR",
      name: "नारी",
      description: "Test Transaction",
      // image: "/images/naarilogo.png",
      order_id: razorpay_order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: async function (response) {
        console.log(response);

        try {
          const res = await axios.post(
            "http://localhost:5001/order/payment-success",
            {
              order_id,
              razorpay_response: response,
              user_id: user._id,
            }
          );
          console.log(res, "Payment Success Response");
          toastNotify(res.data.msg, res.data.status);
          if (res.data.status === 1) {
            console.log(res);
            dispatch(emptyCart());
            navigate(`/thankyou/${order_id}`);
          }
        } catch (error) {
          console.error("Payment failed:", error);
        }
      },
      prefill: {
        name: "Piyush Garg",
        email: user?.email,
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-md font-bold mb-4 text-center border-b pb-6 color">
          ADDRESS & PAYMENT
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* LEFT SIDE */}
          <div className="space-y-8 col-span-3 lg:border-e p-4 border-b lg:border-b-0">
            {/* Default Address Section */}
            <div className="bg-white p-6 border">
              <h2 className="text-md font-bold mb-4 pb-6 color border-b">
                Shipping Address
              </h2>
              {user?.shipping_address?.map((address, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedAddress(index)}
                    className={`relative p-4 border-y flex justify-between items-center text-sm border-gray-200 mb-8 cursor-pointer ${
                      selectedAddress === index
                        ? "shadow-xl bg-slate-50 border-none"
                        : ""
                    }`}
                  >
                    <div className="pr-10">
                      <p className="font-bold text-gray-700">{address?.name}</p>
                      <p className="text-gray-600">
                        {address.addressLine1}, {address.addressLine2},
                        <br />
                        {address.city}, {address.state} {address.postalCode}
                        <br />
                        {address.country}
                      </p>
                      <p className="text-gray-700 font-bold">
                        Phone: +91-{address?.contact}
                      </p>
                    </div>

                    <div className="absolute right-2 top-2 md:hidden p-1 rounded-full cursor-pointer hover:bg-zinc-200 transition duration-300 text-gray-700"
                           onClick={() => removeAddress(index)}>
                            <RxCross2 />
                          </div>

                    <div className="hidden md:block">
                      <button
                        className="border border-zinc-800 text-xs px-3 lg:text-sm py-1 hover:bg-zinc-800 hover:text-white hover:rounded-md transition duration-300"
                        onClick={() => removeAddress(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
              <Link to={"/my/address/add?ref=checkout"}>
                <button className="custom-button max-w-44">
                  + Add New Address
                </button>
              </Link>
            </div>

            {/* Payment Options */}
            <div className="bg-white p-6 border ">
              <h2 className="text-md font-bold mb-4 pb-6 color border-b">
                Payment Method
              </h2>
              <div className="flex-col text-sm ">
                <label className="flex items-center gap-3 cursor-pointer mb-4">
                  <input
                    type="radio"
                    name="payment"
                    value={1}
                    checked={selectedPayment === 1}
                    onChange={() => setSelectedPayment(1)}
                    className="w-4 h-4 accent-black border-gray-300 cursor-pointer"
                  />
                  <span className="text-gray-700">Online Payment</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value={0}
                    checked={selectedPayment === 0}
                    onChange={() => setSelectedPayment(0)}
                    className="w-4 h-4 accent-black border-gray-300 cursor-pointer"
                  />
                  <span className="text-gray-700">Cash on Delivery (COD)</span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="bg-white p-6 h-fit col-span-2 border m-4 lg:mb-0 lg:me-0">
            <h2 className="text-md font-bold mb-4 pb-6 color border-b">
              Order Summary
            </h2>

            <ul className="text-sm font-medium">
              <li className="flex justify-between px-8 ">
                <span>Totla Price</span>
                <span>₹{cart.totalOriginelPrice}</span>
              </li>
              <li className="flex justify-between py-2 border-b px-8 ">
                <span>Discount</span>
                <span className="font-medium text-green-600">
                  - ₹{cart.totalOriginelPrice - cart.totalFinelPrice}
                </span>
              </li>
              <li className="flex justify-between py-2 font-semibold px-8">
                <span>Finel Price</span>
                <span>₹{cart.totalFinelPrice}</span>
              </li>
            </ul>

            <button onClick={placeOrder} className="custom-button text-sm mt-2">
              Confirm & Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
