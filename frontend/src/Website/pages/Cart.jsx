import React, { useContext, useEffect } from "react";
import { MainContext } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../Redux/Reducer/CartSlice";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const { API_BASE_URL, fetchAllproduct, allProduct } = useContext(MainContext);

  const cartData = useSelector((state) => state.cart);
  const userData = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  const verifyUser = () => {
    if (userData) {
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
      <div className="w-full mx-auto p-10 px-40 gap-5 bg-[#dfdce6] flex">
        {/* Cart Items Section */}
        <div className="w-2/3 p-4 bg-white rounded-lg shadow-md border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
          {/* <h2 className="text-2xl text-center font-medium">Cart is Empty!</h2> */}
          {Array.isArray(cartData.data) &&
            cartData.data.map((CartItem, cartIndex) => {
              const availableCartData = allProduct.find(
                (product) => product._id == CartItem.product_id
              );

              return (
                <CartProduct
                  key={cartIndex}
                  availableCartData={availableCartData}
                  API_BASE_URL={API_BASE_URL}
                  CartItem={CartItem}
                />
              );
            })}
        </div>

        {/* Cart Summary Section */}
        <div className="w-1/3 p-4 bg-white rounded-lg shadow-md border max-h-fit border-gray-800">
          <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
          <p className="text-gray-700 font-medium">
            Subtotal Before Discount:{" "}
            <span className="font-bold">${cartData.totalOriginelPrice}</span>
          </p>
          <p className="text-gray-700 font-medium">
            Discount:{" "}
            <span className="font-bold">
              ${cartData.totalOriginelPrice - cartData.totalFinelPrice}
            </span>
          </p>
          <p className="text-gray-800 font-bold text-lg mt-2">
            Total: ${cartData.totalFinelPrice}
          </p>
          <button
            onClick={verifyUser}
            className="w-full mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}

function CartProduct({ API_BASE_URL, availableCartData, CartItem }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow border border-gray-800">
      <img
        src={API_BASE_URL + `/images/product/${availableCartData?.main_img}`}
        alt="Product"
        className="size-24 rounded"
      />
      <div className="flex-1 ml-4">
        <h3 className="font-semibold text-lg">{availableCartData?.name}</h3>
        <p className="text-gray-600 text-sm">
          Category: {availableCartData?.category_id?.categoryName}
        </p>
        <p className="text-gray-800 font-bold">
          ${availableCartData?.finel_price?.toFixed(1)}
        </p>
        <div className="mt-2 flex items-center">
          <label htmlFor="qty" className="mr-2 text-sm">
            Qty:
          </label>
          <input
            type="number"
            id="qty"
            defaultValue={CartItem.qty}
            className="w-14 px-2 py-1 border rounded text-center"
          />
        </div>
      </div>
      <button
        onClick={() =>
          dispatch(removeFromCart({ product_id: availableCartData._id }))
        }
        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
}
