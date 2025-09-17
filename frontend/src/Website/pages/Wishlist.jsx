import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Context, { MainContext } from "../../context/Context";
import { RxCross2 } from "react-icons/rx";
import { UserLogin } from "../../Redux/Reducer/UserSlice";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addToCart } from "../../Redux/Reducer/CartSlice";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const user = useSelector((state) => state.user.data); 
  const [loading, setLoading] = useState(false);
  
  const [loadingUser, setLoadingUser] = useState(true);
  const dispatch = useDispatch();

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
    <>{loadingUser ? (
        <div className="w-full min-h-svh flex mt-10 justify-center"></div>
      ) : (
        user?.wishlist?.length === 0 || !user ? (
        <div className="w-full min-h-svh flex mt-10 justify-center">
          <div className="text-center">
            <div className="w-80 h-60 mx-auto">
              <img
                src="/images/wishlist.png"
                alt="empty_cart"
                className="w-full h-full"
              />
            </div>
            <div className="text-sm font-bold color">
              {!user ? "PLEASE LOG IN" : "YOUR WISHLIST IS WAITING!"}
            </div>
            {!user ? (
              <div className="text-sm font-medium color">
                {" "}
                Login to create your wishlist, keep track of items, <br /> and
                shop them whenever you like.
              </div>
            ) : (
              <div className="text-sm font-medium color">
                {" "}
                Add products you like and move them to your <br /> bag when
                you’re ready.
              </div>
            )}

            {!user ? (
              <div>
                <Link to={"/userlogin?ref=wishlist"}>
                  <button className="px-10 text-sm font-bold py-2 border border-black mt-8 text-black">
                    Login
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to={"/"}>
                  <button className="px-6 text-sm font-bold py-2 border border-black mt-8 text-black">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen">
          <div className="container mx-auto py-5 lg:py-10">
            <div className="w-full text-lg font-bold pb-4 ps-4 border-b">
              My Wishlist ({user?.wishlist?.length})
            </div>
            <div className="w-full h-auto flex flex-wrap md:p-2 lg:p-8 justify-start md:gap-4 lg:gap-20">
              {Array.isArray(user?.wishlist) &&
                user?.wishlist.map((product, index) => {
                  return loading ? (
                    <div
                      key={index}
                      className="relative group p-3 bg-white overflow-hidden w-1/2 border md:border-none md:w-56 lg:w-60"
                    >
                      {/* cross Icon Placeholder */}
                      <div className="absolute right-5 z-10 top-4">
                        <div className="w-6 h-6 rounded-full shimmer"></div>
                      </div>

                      {/* Product Image */}
                      <div className="w-full">
                        <div className="w-full h-64 md:h-72 rounded shimmer"></div>
                      </div>

                      {/* Product Details */}
                      <div className="pt-3 text-center space-y-2">
                        {/* Brand Logo */}
                        <div className="w-10 h-4 mx-auto rounded shimmer"></div>

                        {/* Product Name */}
                        <div className="w-3/4 h-4 mx-auto rounded shimmer"></div>

                        {/* Price Details */}
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <div className="w-12 h-4 rounded shimmer"></div>
                          <div className="w-10 h-3 rounded shimmer"></div>
                          <div className="w-12 h-3 rounded shimmer"></div>
                        </div>
                        {/* button */}
                        <div className="w-full h-7 mx-auto rounded shimmer"></div>
                      </div>
                    </div>
                  ) : (
                    <WishlistCard
                      key={index}
                      product={product}
                      dispatch={dispatch}
                      user={user}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )
      )
      }
    </>
  );
}

function WishlistCard({ product, dispatch, user }) {
  const { API_BASE_URL, toastNotify, fetchAllSize, allSize, toast } =
    useContext(MainContext);
  const MySwal = withReactContent(Swal);
  const handleRemoveFromWishlist = (product_id) => {
    axios
      .put(API_BASE_URL + "/user/addtowishlist", {
        user_id: user._id,
        product_id: product_id,
      })
      .then((success) => {
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

  const handleSelectSize = () => {
    MySwal.fire({
      title: <strong>Select Size</strong>,
      html: (
        <SizePopUp
          product={product}
          API_BASE_URL={API_BASE_URL}
          fetchAllSize={fetchAllSize}
          allSize={allSize}
          user={user}
          dispatch={dispatch}
          toastNotify={toastNotify}
          toast={toast}
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
    <div
      className={`relative w-1/2 border lg:border-none md:w-60 lg:hover:shadow-2xl lg:hover:scale-105 transition duration-300 p-3
    `}
    >
      <div
        className="absolute right-5 z-10 top-4 border border-gray-500 p-1 bg-gray-200 rounded-full opacity-70"
        onClick={() => handleRemoveFromWishlist(product?._id)}
      >
        <RxCross2 className={`md:text-3xl lg:text-sm cursor-pointer`} />
      </div>
      <Link to={`/detail/${product?._id}`}>
        <div>
          <img
            src={`${product?.main_img}`}
            alt="Product image"
            className={`w-full h-64 md:h-72 cursor-pointer ${
              product?.stock === false ? "opacity-40" : "opacity-100"
            }`}
          />
        </div>
      </Link>
      {/* Product Details */}
      <div className="pt-3 text-center">
        <div>
          <img src="/images/Brand_name.png" alt="" className="w-10 mx-auto" />
        </div>
        <h3 className="truncate text-sm color font-medium">{product.name}</h3>

        {/* Price Details */}
        <div className="flex items-center justify-center gap-2 whitespace-nowrap mt-1 text-xs">
          <div className="font-bold text-zinc-800">₹{product.finel_price}</div>
          <span className="text-gray-500 line-through">
            {product.discount_percentage > 0 && `₹${product.original_price}`}
          </span>
          <span className="text-green-600 font-semibold">
            {product.discount_percentage > 0 &&
            `${product.discount_percentage} % off`}
          </span>
        </div>
        {product?.stock === false ? (
          <button
            className="w-full mt-2 border border-zinc-800 text-xs px-3 lg:text-sm py-1"
            disabled
          >
            OUT OF STOCK
          </button>
        ) : (
          <button
            className="w-full mt-2 border border-zinc-800 text-xs px-3 lg:text-sm py-1 hover:bg-zinc-800 hover:text-white hover:rounded-md transition duration-500"
            onClick={handleSelectSize}
          >
            Move To Bag
          </button>
        )}
      </div>
    </div>
  );
}

function SizePopUp({
  API_BASE_URL,
  product,
  allSize,
  user,
  dispatch,
  toastNotify,
  toast,
}) {
  const [productSize, setProductSize] = useState(null);

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

  const handleAddToCart = () => {
    if (!productSize && !hasOneSize) {
      toast.error("Please select a size!");
      return;
    }

    if (user) {
      axios
        .post(API_BASE_URL + "/user/addtocart", {
          user_id: user?._id,
          product_id: product?._id,
          size: hasOneSize ? OneSize[0]?.sizeLabel : productSize,
        })
        .then((success) => {
          toastNotify(success.data.msg, success.data.status);
          if (success.data.status == 1) {
            dispatch(
              addToCart({
                _id: product?._id,
                original_price: product?.original_price,
                finel_price: product?.finel_price, // corrected
                sizes: product?.sizes,
                main_img: product?.main_img,
                name: product?.name,
                discount_percentage: product?.discount_percentage,
                stock: product?.stock,
                size: hasOneSize ? OneSize[0]?.sizeLabel : productSize,
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(
        addToCart({
          _id: product?._id,
          original_price: product?.original_price,
          finel_price: product?.finel_price,
          size: hasOneSize ? OneSize[0]?.sizeLabel : productSize,
        })
      );
    }
    {
      Swal.close();
    }
  };

  return (
    <div className="space-y-8 border-t pt-6 border-gray-700 max-h-[80vh] overflow-y-auto px-3 sm:px-6">
      {hasOneSize ? (
        <div>
          <button className="border-2 p-2 rounded-3xl text-yellow-700 font-bold test-sm border-yellow-700">
            OneSize
          </button>
        </div>
      ) : (
        <div className="flex gap-3 justify-center">
          {sizeOptions.map((size, index) => {
            const isAvailable = product?.sizes?.some((s) => s === size._id);
            const isSelected = productSize === size.sizeLabel;

            return (
              <button
                key={index}
                onClick={() => setProductSize(size.sizeLabel)}
                className={`w-12 h-12 rounded-full text-sm font-bold
  ${
    isAvailable
      ? "hover:border-yellow-700"
      : "text-gray-400 cursor-not-allowed  hover:border-gray-400"
  }
  ${
    isSelected
      ? "border-2 border-yellow-700 text-yellow-700"
      : "border-2 border-gray-400 text-black "
  }`}
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
        onClick={handleAddToCart}
      >
        Done
      </button>
    </div>
  );
}
