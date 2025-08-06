import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQty,
  updateSize,
} from "../../Redux/Reducer/CartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCaretDown } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Cart() {
  const {
    API_BASE_URL,
    fetchAllproduct,
    fetchAllSize,
    allSize,
    allProduct,
    toast,
  } = useContext(MainContext);

  const cartData = useSelector((state) => state.cart);
  console.log(cartData, "cartData");
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  const verifyUser = () => {
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/userlogin?ref=cart");
    }
  };

  useEffect(() => {
    fetchAllproduct();
  }, []);
  return (
    <>
      <div className="w-full p-4 lg:p-0  mx-auto gap-5 py-4 color lg:flex  min-h-svh">
        {/* Cart Items Section */}
        <div className="w-full lg:w-3/5  lg:py-6 lg:ps-20 lg:pe-16 lg:border-e border-zinc-300">
          <div className="w-full">
            <h2 className="text-md font-bold pb-4">Shopping Bag</h2>
            {cartData.data.length > 0 ? (
              Array.isArray(cartData.data) &&
              cartData?.data?.map((CartItem, cartIndex) => {
                const availableCartData =
                  Array.isArray(allProduct) &&
                  allProduct?.find(
                    (product) => product._id == CartItem.product_id._id
                  );

                return (
                  <CartProduct
                    key={cartIndex}
                    availableCartData={availableCartData}
                    API_BASE_URL={API_BASE_URL}
                    CartItem={CartItem}
                    toast={toast}
                    user={user}
                    allProduct={allProduct}
                    fetchAllSize={fetchAllSize}
                    allSize={allSize}
                  />
                );
              })
            ) : (
              <h2 className="text-2xl text-center font-medium">
                Cart is Empty!
              </h2>
            )}
          </div>
        </div>
        {/* Cart Summary Section */}
        <div className="w-full pt-10 lg:w-2/5 lg:py-6 lg:ps-10 lg:pe-20">
          <h2 className="text-md font-bold mb-4">Price Details</h2>
          <div className="w-full pt-4 pb-4 bg-white max-h-fit border-t text-sm border-zinc-300 space-y-3">
            <p className="font-medium flex justify-between px-6">
              Total MRP:{" "}
              <span>
                ₹{Number(cartData.totalOriginelPrice).toLocaleString("en-IN")}
              </span>
            </p>
            <p className="font-medium flex justify-between px-6">
              Discount on MRP:{" "}
              <span className="text-green-600">
                - ₹
                {(
                  cartData.totalOriginelPrice - cartData.totalFinelPrice
                ).toLocaleString("en-IN")}
              </span>
            </p>
            <p className="font-medium flex justify-between border-b border-zinc-300 px-6 pb-4">
              Delivery Fee: <span>+ ₹100</span>
            </p>

            <p className="font-bold text-md mt-2 flex justify-between px-6">
              Total Amount:{" "}
              <span>
                ₹
                {(Number(cartData.totalFinelPrice) + 100).toLocaleString(
                  "en-IN"
                )}
              </span>
            </p>
            <button
              onClick={verifyUser}
              disabled={!cartData.data.length}
              className={`w-full mt-4 px-4 py-2  ${
                cartData.data.length
                  ? "custom-button"
                  : "bg-zinc-600 text-gray-200 rounded border border-zinc-600 cursor-not-allowed"
              }`}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function CartProduct({
  API_BASE_URL,
  availableCartData,
  CartItem,
  toast,
  allProduct,
  user,
  fetchAllSize,
  allSize,
}) {
  const [productSize, setProductSize] = useState(CartItem?.size);
  console.log(productSize, 'productSize');
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const handleRemoveFromCart = (data) => {
    dispatch(removeFromCart(data));
    toast.success("Item removed!");
    if (user) {
      axios
        .post(API_BASE_URL + "/user/removefromcart", {
          user_id: user._id,
          product_id: data.product_id,
          size: data.size,
        })
        .then((success) => {
          console.log(success);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleQtyChange = (newQty, size) => {
    newQty = parseInt(newQty);
    console.log(size);
    console.log(newQty);

    if (newQty > 0) {
      // First update MongoDB if user is logged in
      if (user) {
        axios
          .post(API_BASE_URL + "/user/updatecartqty", {
            user_id: user._id,
            product_id: CartItem.product_id._id,
            qty: newQty,
            size: size,
          })
          .then((success) => {
            if (success.data.status === 1) {
              dispatch(
                updateQty({
                  product_id: availableCartData._id,
                  original_price: availableCartData.original_price,
                  finel_price: availableCartData.finel_price,
                  qty: newQty,
                  size: size,
                })
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // If user not logged in, only update Redux
        dispatch(
          updateQty({
            product_id: availableCartData._id,
            original_price: availableCartData.original_price,
            finel_price: availableCartData.finel_price,
            qty: newQty,
            size: size,
          })
        );
      }
    }
  };

  const handleSizeChange = () => {
    MySwal.fire({
      title: <strong>Select Size</strong>,
      html: (
        <SizePopUp
          availableCartData={availableCartData}
          API_BASE_URL={API_BASE_URL}
          fetchAllSize={fetchAllSize}
          allSize={allSize}
          setProductSize={setProductSize}
          productSize={productSize}
          CartItem={CartItem}
          user={user}
          dispatch={dispatch}
        />
      ),
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  useEffect(() => {
    fetchAllSize();
  }, []);
  return (
    <div className="flex items-center justify-between p-2 lg:p-4 lg:px-8 mb-2 border-y border-zinc-300">
      <img
        src={API_BASE_URL + `/images/product/${availableCartData?.main_img}`}
        alt="Product"
        className="size-24 rounded"
      />
      <div className="flex-1 ml-4">
        <h3 className="font-semibold text-sm">{availableCartData?.name}</h3>
        <p className="text-sm">
          Category: {availableCartData?.category_id?.categoryName}
        </p>
        <p className="text-sm font-bold">
          ₹
          {(availableCartData?.finel_price * CartItem.qty).toLocaleString(
            "en-IN"
          )}
        </p>

        <div className="flex  gap-4 items-center">
          <div className="mt-2 flex items-center">
            <label htmlFor="qty" className="mr-2 text-xs">
              size:
            </label>
            <div
              className="flex border p-1 rounded items-center"
              onClick={() => handleSizeChange()}
            >
              <span className="mr-2 text-xs">{CartItem?.size}</span>
              <FaCaretDown />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <label htmlFor="qty" className="mr-2 text-xs">
              Qty:
            </label>
            <input
              type="number"
              id="qty"
              value={CartItem.qty}
              className="w-14 px-2 border rounded text-center focus:outline-none"
              onChange={(event) =>
                handleQtyChange(event.target.value, CartItem?.size)
              }
            />
          </div>
        </div>
      </div>
      <button
        onClick={() =>
          handleRemoveFromCart({
            product_id: availableCartData._id,
            original_price: availableCartData.original_price,
            finel_price: availableCartData.finel_price,
            qty: CartItem.qty,
            size: CartItem?.size,
          })
        }
        className="border border-zinc-800 text-xs px-3 lg:text-sm py-1 hover:bg-zinc-800 hover:text-white hover:rounded-md transition duration-300"
      >
        Remove
      </button>
    </div>
  );
}

function SizePopUp({
  API_BASE_URL,
  availableCartData,
  allSize,
  setProductSize,
  productSize,
  CartItem,
  user,
  dispatch,
}) {
  const [localSize, setLocalSize] = useState(productSize);
  console.log(localSize, "localSize");
  console.log(CartItem.product_id._id);
  // const dispatch = useDispatch();

  const updateProductSize = () => {
    if (user) {
      axios
        .patch(API_BASE_URL + "/user/updatesize", {
          user_id: user._id,
          product_id: CartItem.product_id._id,
          oldSize: CartItem.size,
          newSize: localSize,
        })
        .then((success) => {
          if (success.data.status == 1) {
            dispatch(
              updateSize({
                product_id: CartItem.product_id._id,
                oldSize: CartItem.size,
                newSize: localSize,
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(
        updateSize({
          product_id: CartItem.product_id._id,
          oldSize: CartItem.size,
          newSize: localSize,
        })
      );
    }
    {
      setProductSize(localSize);
      Swal.close();
    }
  };

  return (
    <div className="space-y-8 border-t pt-6 border-gray-700">
      <div className="flex gap-3 justify-center">
        {Array.isArray(allSize) &&
          allSize?.map((size, index) => {
            const isAvailable = availableCartData?.sizes?.some(
              (s) => s === size._id
            );
            const isSelected = localSize === size.sizeLabel;

            return (
              <button
                key={index}
                onClick={() => setLocalSize(size.sizeLabel)}
                className={`w-12 h-12 rounded-full text-sm font-bold
  ${
    isAvailable ? "hover:border-yellow-700" : "text-gray-400 cursor-not-allowed"
  }
  ${
    isSelected
      ? "border-2 border-yellow-700 text-yellow-700"
      : "border-2 border-gray-400 text-black "
  }
 
`}
                disabled={!isAvailable}
              >
                {size.sizeLabel}
              </button>
            );
          })}
      </div>
      <button
        className="bg-zinc-800 text-white w-full py-2 hover:bg-zinc-900"
        onClick={updateProductSize}
      >
        Done
      </button>
    </div>
  );
}
