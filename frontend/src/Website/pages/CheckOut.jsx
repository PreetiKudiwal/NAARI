import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { MainContext } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const user = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart);
  const {API_BASE_URL} = useContext(MainContext)
  const navigate = useNavigate();

  const placeOrder = () => {
    axios.post(API_BASE_URL + '/order/order-place', {
      user_id: user._id,
      order_total: cart.totalFinelPrice,
      payment_mode: selectedPayment,
      shipping_details: user?.shipping_address[selectedAddress]
    }).then(
      (success) => {
        if (success.data.status == 1) {
          navigate('/thankyou');
        }
      }
    ).catch(
      (error) => {

      }
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Proceed to Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            {/* Default Address Section */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Shipping Address
              </h2>
              {user?.shipping_address?.map((address, index) => {
                return (
                  <div
                   key={index}
                   onClick={() => setSelectedAddress(index)}
                    className={`bg-gray-50 p-4 rounded-lg border border-gray-200 mb-2 cursor-pointer ${selectedAddress === index ? "bg-blue-300 border-2 border-blue-400" : ''}`}>
                    <p className="font-medium text-gray-700">Preeti Kumawat</p>
                    <p className="text-gray-600">
                      {address.addressLine1}, {address.addressLine2},
                      <br />
                       {address.city}, {address.state} {address.postalCode}
                       <br />
                       {address.country}
                    </p>
                    <p className="text-gray-600">Phone: +91 98765 43210</p>
                  </div>
                );
              })}
              
              <button className="mt-4 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                + Add New Address
              </button>
            </div>

            {/* Payment Options */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value={1}
                    checked={selectedPayment === 1}
                    onChange={() => setSelectedPayment(1)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
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
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                  />
                  <span className="text-gray-700">Cash on Delivery (COD)</span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>

            <ul className="divide-y divide-gray-200 mb-4">
              <li className="flex justify-between py-3">
                <span className="text-gray-700">Totla Price</span>
                <span className="font-medium text-gray-800">${cart.totalOriginelPrice}</span>
              </li>
              <li className="flex justify-between py-3">
                <span className="text-gray-700">Discount</span>
                <span className="font-medium text-gray-800">${cart.totalOriginelPrice - cart.totalFinelPrice}</span>
              </li>
              <li className="flex justify-between py-3 font-semibold">
                <span>Finel Price</span>
                <span>${cart.totalFinelPrice}</span>
              </li>
            </ul>

            <button onClick={placeOrder} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium">
              Confirm & Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
