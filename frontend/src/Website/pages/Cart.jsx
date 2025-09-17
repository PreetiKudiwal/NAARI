import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  lsGetData,
  removeFromCart,
  updateQty,
  updateSize,
} from "../../Redux/Reducer/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCaretDown } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import OutOfStockNotice from "../components/OutOfStockNotice";
import { RxCross2 } from "react-icons/rx";

export default function Cart() {
  const {
    API_BASE_URL,
    fetchAllproduct,
    allProduct,
    fetchAllSize,
    allSize,
    toast,
  } = useContext(MainContext);

  const cartData = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showOOSNotice, setShowOOSNotice] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loading, setLoading] = useState(true);

  const hasOOSItems =
    Array.isArray(cartData.data) &&
    cartData.data.some((cartItem) => cartItem.product_id.stock === false);

  const verifyUser = () => {
    if (hasOOSItems) {
      setShowOOSNotice(true); // show modal
      return;
    }

    if (cartData.totalFinelPrice > 40000) {
      Swal.fire({
        icon: "warning",
        title: "Order Limit Exceeded",
        text: "Maximum order amount allowed is ₹40,000",
        confirmButtonColor: "#000",
      });
      return;
    }

    if (user) {
      navigate("/checkout");
    } else {
      navigate("/userlogin?ref=cart");
    }
  };

  useEffect(() => {
    if (showOOSNotice || cartData.totalFinelPrice > 40000) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`; // prevent layout shift
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px"; // reset
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [showOOSNotice, cartData.totalFinelPrice]);


  useEffect(() => {
    fetchAllproduct();
    dispatch(lsGetData());
  }, []);

  useEffect(() => {
    setLoading(true);
    setLoadingUser(true);
    setTimeout(() => {
      setLoadingUser(false);
    }, 100);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {loadingUser ? (
        <div className="w-full min-h-svh flex mt-10 justify-center"></div>
      ) : cartData.data.length === 0 ? (
        <div className="w-full min-h-svh flex mt-10 justify-center">
          <div className="text-center ">
            <div className="w-80 h-60">
              <img
                src="/images/empty_cart.png"
                alt="empty_cart"
                className="w-full h-full"
              />
            </div>
            <div className="text-sm font-bold color">YOUR BAG IS EMPTY</div>
            <div className="text-sm font-medium color">
              Shop now to fill it.
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full p-4 lg:p-0  mx-auto gap-5 py-4 color lg:flex  min-h-svh">
          {/* Cart Items Section */}
          <div className="w-full lg:w-3/5  lg:py-6 lg:ps-20 lg:pe-16 lg:border-e border-zinc-300">
            <div className="w-full">
              <h2 className="text-md font-bold pb-4">Shopping Bag</h2>
              {cartData.data.length > 0 ? (
                Array.isArray(cartData.data) &&
                cartData?.data?.map((CartItem, cartIndex) => {
                  return loading ? (
                    <div
                      key={cartIndex}
                      className="flex items-center justify-between p-2 lg:p-4 lg:px-8 mb-2 border-y border-zinc-300"
                    >
                      {/* Image Skeleton */}
                      <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded shimmer"></div>

                      {/* Product Details Skeleton */}
                      <div className="flex-1 ml-1 md:ml-4 w-40 md:w-auto">
                        <div className="h-4 bg-gray-200 rounded w-32 mb-2 shimmer"></div>
                        <div className="h-3 bg-gray-200 rounded w-20 mb-2 shimmer"></div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-3 shimmer"></div>

                        <div className="flex gap-4 items-center">
                          {/* Size Skeleton */}
                          <div className="mt-2 flex items-center">
                            <div className="h-6 w-12 bg-gray-200 rounded shimmer"></div>
                          </div>
                          {/* Qty Skeleton */}
                          <div className="mt-2 flex items-center">
                            <div className="h-6 w-14 bg-gray-200 rounded shimmer"></div>
                          </div>
                        </div>
                      </div>
                      {/* Remove Button Skeleton */}
                      <div className="h-8 w-16 bg-gray-200 rounded shimmer"></div>
                    </div>
                  ) : (
                    <CartProduct
                      key={cartIndex}
                      product={CartItem?.product_id}
                      API_BASE_URL={API_BASE_URL}
                      CartItem={CartItem}
                      toast={toast}
                      user={user}
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
            {loading ? (
              <div className="w-full pt-4 pb-4 bg-white max-h-fit border-t text-sm border-zinc-300 space-y-3">
                {/* Total MRP */}
                <div className="flex justify-between px-6">
                  <div className="h-4 w-24 bg-gray-200 rounded shimmer"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded shimmer"></div>
                </div>

                {/* Discount */}
                <div className="flex justify-between px-6">
                  <div className="h-4 w-32 bg-gray-200 rounded shimmer"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded shimmer"></div>
                </div>

                {/* Delivery Fee */}
                <div className="flex justify-between px-6 pb-4 border-b border-zinc-300">
                  <div className="h-4 w-28 bg-gray-200 rounded shimmer"></div>
                  <div className="h-4 w-14 bg-gray-200 rounded shimmer"></div>
                </div>

                {/* Total Amount */}
                <div className="flex justify-between px-6 mt-2">
                  <div className="h-5 w-28 bg-gray-200 rounded shimmer"></div>
                  <div className="h-5 w-20 bg-gray-200 rounded shimmer"></div>
                </div>

                {/* Place Order button */}
                <div className="px-6">
                  <div className="w-full h-10 bg-gray-300 rounded mt-4 shimmer"></div>
                </div>
              </div>
            ) : (
              <div className="w-full pt-4 pb-4 bg-white max-h-fit border-t text-sm border-zinc-300 space-y-3">
                <p className="font-medium flex justify-between px-6">
                  Total MRP:{" "}
                  <span>
                    ₹
                    {Number(cartData.totalOriginelPrice).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </p>
                <p className="font-medium flex justify-between px-6 border-b border-zinc-300 pb-4">
                  Discount on MRP:{" "}
                  <span className="text-green-600">
                    - ₹
                    {(
                      cartData.totalOriginelPrice - cartData.totalFinelPrice
                    ).toLocaleString("en-IN")}
                  </span>
                </p>

                <p className="font-bold text-md mt-2 flex justify-between px-6">
                  Total Amount:{" "}
                  <span>
                    ₹{Number(cartData.totalFinelPrice).toLocaleString("en-IN")}
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
            )}
          </div>
          {/* OutOfStockNotice Modal */}
          {showOOSNotice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowOOSNotice(false)}
              ></div>

              {/* Modal */}
              <div className="relative z-10 w-[90%] sm:w-auto">
                <OutOfStockNotice setShowOOSNotice={setShowOOSNotice} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function CartProduct({
  API_BASE_URL,
  product,
  CartItem,
  toast,
  user,
  fetchAllSize,
  allSize,
}) {
  const [productSize, setProductSize] = useState(CartItem?.size);
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
    if (newQty < 1) newQty = 1;
    if (newQty > 5) newQty = 5;

    if (newQty >= 1 && newQty <= 5) {
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
                  product_id: product?._id,
                  original_price: product?.original_price,
                  finel_price: product?.finel_price,
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
            product_id: product?._id,
            original_price: product?.original_price,
            finel_price: product?.finel_price,
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
          product={product}
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
      allowOutsideClick: true,
      scrollbarPadding: false, // prevents content from shifting
      didOpen: () => {
        const scrollBarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      },
      willClose: () => {
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "0px";
      },
    });
  };

  useEffect(() => {
    fetchAllSize();
  }, []);

  return (
    <div className="relative flex items-center justify-between p-2 lg:p-4 lg:px-8 mb-2 border-y border-zinc-300 ">
      <Link to={`/detail/${product?._id}`}>
        <div className="relative w-20 h-20 md:w-24 md:h-24">
          <img
            src={`${product?.main_img}`}
            alt="Product"
            className={`w-full h-full rounded cursor-pointer ${
              product?.stock === false ? "opacity-50" : "opacity-100"
            }`}
          />
          <div
            className={`absolute bottom-0 text-xs w-full rounded-b text-center font-medium bg-black text-white opacity-70 ${
              product?.stock === false ? "block" : "hidden"
            }`}
          >
            OUT OF STOCK
          </div>
        </div>
      </Link>
      <div className="flex-1 ml-1 md:ml-4 w-40 md:w-auto pe-10 md:pe-20">
        <h3 className="truncate text-xs color font-medium md:w-60">
          {product.name}
        </h3>

        {/* Price Details */}

        <div className="flex items-center gap-2 whitespace-nowrap mt-1 text-xs">
          <div className="font-bold color">
            ₹{(product?.finel_price * CartItem.qty).toLocaleString("en-IN")}
          </div>
          <span className="text-gray-500 line-through">
            {product?.discount_percentage > 0 &&
              `₹${(product?.original_price * CartItem.qty).toLocaleString(
                "en-IN"
              )}`}
          </span>
          <span className="text-green-600 font-semibold">
            {product?.discount_percentage > 0 &&
              `${product?.discount_percentage} % off`}
          </span>
        </div>

        <div className="flex  gap-4 items-center">
          <div className="mt-2 flex items-center">
            <label htmlFor="qty" className="mr-2 text-xs">
              size:
            </label>
            <div
              className="flex border p-1 rounded items-center cursor-pointer"
              onClick={handleSizeChange}
            >
              <span className="mr-2 text-[10px] lg:text-xs">
                {CartItem?.size}
              </span>
              <FaCaretDown />
            </div>
          </div>

          <div className="mt-2 flex items-center">
            <label htmlFor="qty" className="mr-2 text-xs">
              Qty:
            </label>
            <div className="flex items-center border rounded overflow-hidden">
              {/* Decrease Button */}
              <button
                type="button"
                className="px-2 py-0.5 text-sm font-bold hover:bg-gray-200 active:scale-90 transition transform duration-150 disabled:opacity-50"
                onClick={() =>
                  handleQtyChange(Math.max(1, CartItem.qty - 1), CartItem?.size)
                }
                disabled={CartItem.qty <= 1}
              >
                -
              </button>

              {/* Quantity Display */}
              <span className="px-2 text-sm font-medium">{CartItem.qty}</span>

              {/* Increase Button */}
              <button
                type="button"
                className="px-2 py-0.5 text-sm font-bold hover:bg-gray-200 active:scale-90 transition transform duration-150 disabled:opacity-50"
                onClick={() =>
                  handleQtyChange(Math.min(5, CartItem.qty + 1), CartItem?.size)
                }
                disabled={CartItem.qty >= 5}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute right-2 top-2 md:hidden p-1 rounded-full cursor-pointer hover:bg-zinc-200 transition duration-300"
        onClick={() =>
          handleRemoveFromCart({
            product_id: product?._id,
            original_price: product?.original_price,
            finel_price: product?.finel_price,
            qty: CartItem.qty,
            size: CartItem?.size,
          })
        }
      >
        <RxCross2 />
      </div>
      <button
        onClick={() =>
          handleRemoveFromCart({
            product_id: product?._id,
            original_price: product?.original_price,
            finel_price: product?.finel_price,
            qty: CartItem.qty,
            size: CartItem?.size,
          })
        }
        className="border border-zinc-800 text-xs px-3 lg:text-sm py-1 hover:bg-zinc-800 hover:text-white hover:rounded-md transition duration-300 hidden md:block"
      >
        Remove
      </button>
    </div>
  );
}

function SizePopUp({
  API_BASE_URL,
  product,
  allSize,
  setProductSize,
  productSize,
  CartItem,
  user,
  dispatch,
}) {
  const [localSize, setLocalSize] = useState(productSize);

  // size select code

  const OneSize = allSize.filter((s, i) => {
    return s.sizeLabel == "OneSize";
  });


  const hasOneSize =
    Array.isArray(OneSize) &&
    OneSize.some((size) => product?.sizes?.includes(size._id));

  const sizeOptions =
    Array.isArray(allSize) &&
    allSize.filter((s, i) => {
      return s.sizeLabel !== "OneSize";
    });

  const updateProductSize = () => {
    if (user) {
      axios
        .patch(API_BASE_URL + "/user/updatesize", {
          user_id: user._id,
          product_id: product?._id,
          oldSize: CartItem.size,
          newSize: hasOneSize ? OneSize[0]?.sizeLabel : localSize,
        })
        .then((success) => {
          if (success.data.status == 1) {
            dispatch(
              updateSize({
                product_id: product?._id,
                oldSize: CartItem.size,
                newSize: hasOneSize ? OneSize[0]?.sizeLabel : localSize,
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
          product_id: product?._id,
          oldSize: CartItem.size,
          newSize: hasOneSize ? OneSize[0]?.sizeLabel : localSize,
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
      {hasOneSize ? (
        <div>
          <button className="border-2 p-2 rounded-3xl text-yellow-700 font-bold test-sm border-yellow-700">
            OneSize
          </button>
        </div>
      ) : (
        <div className="flex gap-3 justify-center">
          {Array.isArray(sizeOptions) &&
            sizeOptions?.map((size, index) => {
              const isAvailable = product?.sizes?.some((s) => s === size._id);
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
      )}
      <button
        className="bg-zinc-800 text-white w-full py-2 hover:bg-zinc-900"
        onClick={updateProductSize}
      >
        Done
      </button>
    </div>
  );
}
