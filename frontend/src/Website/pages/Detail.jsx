import React, { use, useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Reducer/CartSlice";
import axios, { all } from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsFillHandbagFill } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { LiaRulerCombinedSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { UserLogin } from "../../Redux/Reducer/UserSlice";
import { FaHeart } from "react-icons/fa6";
import ShowSizes from "../components/ShowSizes";

export default function Detail() {
  const {
    API_BASE_URL,
    fetchSingleProduct,
    singleProduct,
    fetchAllproduct,
    allProduct,
    fetchAllSize,
    allSize,
    toast,
    toastNotify,
  } = useContext(MainContext);
  const { product_id } = useParams();
  const [selectedImg, setSelectedImg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart.data);
  const slug = singleProduct?.category_id?.categorySlug;
  const [selectedSize, setSelectedSize] = useState(null);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    pauseOnHover: false,
    autoplaySpeed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
  fetchSingleProduct(product_id)
}, [product_id]);


  // size selection code

  const OneSize = allSize.filter((s, i) => {
    return s.sizeLabel == "OneSize";
  });

  const hasOneSize =
    Array.isArray(OneSize) &&
    OneSize.some((size) => singleProduct?.sizes?.includes(size._id));

  const sizeOptions =
    Array.isArray(allSize) &&
    allSize.filter((s, i) => {
      return s.sizeLabel !== "OneSize";
    });

  const handleAddToCart = (data) => {
    if (!selectedSize && !hasOneSize) {
      setShake(true); // Shake trigger
      toast.error("Please select a size!");
      setTimeout(() => setShake(false), 500); // animation reset
      return;
    }
    dispatch(addToCart(data));
    toast.success("Added to bag!");
    if (user) {
      axios
        .post(API_BASE_URL + "/user/addtocart", {
          user_id: user._id,
          product_id: singleProduct._id,
          size: hasOneSize ? OneSize[0]?.sizeLabel : selectedSize,
        })
        .then((success) => {
          console.log(success);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setSelectedSize(null);
  }, [product_id]);

  const handleAddToWishlist = () => {
    if (!user) {
      return navigate("/wishlist");
    }
    axios
      .put(API_BASE_URL + "/user/addtowishlist", {
        user_id: user._id,
        product_id: singleProduct?._id,
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

  const hasProductInWishlist = user?.wishlist?.some(
    (item) => item?._id?.toString() === singleProduct?._id?.toString()
  );

  const hasProductInCart = cart?.some(
    (item) => item?.product_id?._id?.toString() === singleProduct?._id?.toString()
  );

  useEffect(() => {
    if (singleProduct && singleProduct?.main_img) {
      setSelectedImg(singleProduct?.main_img); // default to main image
    }
  }, [singleProduct]);

  useEffect(() => {
    fetchAllSize();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchAllproduct(null, 6, slug);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [slug, product_id]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:mt-8 lg:mt-0">
        {/* Left Section - Images */}

        {/* mobile */}

        <div className="relative md:hidden mt-4">
          {loading ? (
            <div className="w-full h-[500px] bg-gray-200 shimmer rounded"></div>
          ) : Array.isArray(singleProduct?.other_img) &&
            singleProduct?.other_img.length === 0 ? (
            <div className="w-full h-[500px]">
              <img
                src={`${singleProduct?.main_img}`}
                alt={`thumb-main_img`}
                className="w-full h-full cursor-pointer bg-white focus:outline-none"
              />
            </div>
          ) : (
            <Slider {...settings}>
              <div className="w-full h-[500px]">
                <img
                  src={`${singleProduct?.main_img}`}
                  alt={`thumb-main_img`}
                  className="w-full h-full cursor-pointer bg-white focus:outline-none"
                />
              </div>
              {Array.isArray(singleProduct?.other_img) &&
                singleProduct?.other_img.map((image, index) => {
                  const fullImgPath = `${image}`;
                  return (
                    <div key={index}>
                      <img
                        src={fullImgPath}
                        alt={`thumb-${index}`}
                        className="w-full h-[500px] cursor-pointer bg-white focus:outline-none"
                      />
                    </div>
                  );
                })}
            </Slider>
          )}

          {singleProduct?.top_selling && (
            <div className="bestseller-tag font-bold px-4 py-1">
              <span className="bestseller-text">Bestseller</span>
              <span className="sparkle"></span>
            </div>
          )}
        </div>

        {/* desktop */}
        <div className="hidden md:block">
          <div className="flex justify-around gap-5 lg:gap-0 sticky top-24">
            <div className="space-y-2">
              {loading ? (
                <div className="w-20 h-20 lg:h-28 bg-gray-200 cursor-pointer border-2 rounded shimmer"></div>
              ) : (
                <img
                  src={
                    `${singleProduct?.main_img}`
                  }
                  alt="Main Product"
                  className={`w-20 h-20 lg:h-28 cursor-pointer border-2 rounded ${
                    singleProduct?.main_img === selectedImg
                      ? "border-yellow-700"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImg(singleProduct?.main_img)}
                />
              )}
              {Array.isArray(singleProduct?.other_img) &&
                singleProduct?.other_img.map((image, index) => {
                  const fullImgPath = `${image}`;
                  const isSelected = image === selectedImg;
                  return loading ? (
                    <div
                      key={index}
                      className="w-20 h-20 lg:h-28 bg-gray-200 cursor-pointer border-2 rounded shimmer"
                    ></div>
                  ) : (
                    <img
                      key={index}
                      src={fullImgPath}
                      alt={`thumb-${index}`}
                      className={`w-20 h-20 lg:h-28 cursor-pointer border-2 rounded ${
                        isSelected ? "border-yellow-700" : "border-gray-300"
                      }`}
                      onClick={() => setSelectedImg(image)}
                    />
                  );
                })}
            </div>

            {loading ? (
              <div className="w-[450px] md:h-[500px] lg:h-[600px] bg-gray-200 cursor-pointer rounded shimmer"></div>
            ) : (
              <div className="group relative overflow-hidden cursor-zoom-in">
                <img
                  src={`${selectedImg}`}
                  alt="Main Product"
                  className="w-[450px] md:h-[500px] lg:h-[600px] group-hover:scale-105 transition duration-300"
                />
                {singleProduct?.top_selling && (
                  <div className="bestseller-tag font-bold text-lg px-8 py-1">
                    <span className="bestseller-text">Bestseller</span>
                    <span className="sparkle"></span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Details */}
        {loading ? (
          <div className="space-y-4">
            {/* Brand Logo */}
            <div className="w-14 h-6 shimmer rounded"></div>

            {/* Product Name */}
            <div className="w-3/4 h-6 shimmer rounded"></div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-6 shimmer rounded"></div>
              <div className="w-16 h-5 shimmer rounded"></div>
              <div className="w-16 h-5 shimmer rounded"></div>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-2">
              <div className="w-24 h-4 shimmer rounded"></div>
              <div className="w-20 h-4 shimmer rounded"></div>
            </div>

            {/* Color */}
            <div>
              <div className="w-16 h-4 shimmer rounded mb-2"></div>
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-6 h-6 shimmer rounded-full"></div>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-8">
                <div className="w-20 h-4 shimmer rounded"></div>
                <div className="w-16 h-3 shimmer rounded"></div>
              </div>
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-12 h-12 shimmer rounded-full"></div>
                ))}
              </div>
            </div>

            {/* Mobile Buttons */}
            <div className="flex w-full gap-4 py-2 px-1 md:hidden sticky bottom-0 bg-white">
              <div className="w-1/2 h-10 shimmer rounded"></div>
              <div className="w-1/2 h-10 shimmer rounded"></div>
            </div>

            {/* Desktop Buttons */}
            <div className="flex w-full gap-4 md:pt-2 border-b-2 md:pb-5">
              <div className="hidden md:block w-1/2 h-10 shimmer rounded"></div>
              <div className="hidden md:block w-1/2 h-10 shimmer rounded"></div>
            </div>

            {/* Delivery Options */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-32 h-5 shimmer rounded"></div>
                <div className="w-6 h-6 shimmer rounded"></div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-40 h-8 shimmer rounded"></div>
                <div className="w-12 h-8 shimmer rounded"></div>
              </div>

              <div className="w-60 h-3 shimmer rounded"></div>

              <ul className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <li key={i} className="w-3/4 h-3 shimmer rounded"></li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <img src="https://res.cloudinary.com/dbglxb4z0/image/upload/v1760000193/Brand_name_av79dx.png" alt="" className="w-14" />
            </div>
            <p className="text-black font-bold text-md">
              {singleProduct?.name}
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 text-md font-bold">
              <span className="text-black">
                ₹{singleProduct?.finel_price}
              </span>
              <span className="line-through text-gray-500">
                {singleProduct?.discount_percentage > 0 && `₹${singleProduct?.original_price}`}
              </span>
              <span className="text-green-600">
                {singleProduct?.discount_percentage > 0 &&
            `${singleProduct?.discount_percentage} % off`}
              </span>
            </div>

            {/* Reviews */}
            <div className="flex items-center text-base">
              <div className="flex items-center justify-center text-white bg-yellow-700 px-2 rounded-full">
              <span className="text-sm font-medium mt-[2px]">5</span>{"★"}
              </div>
              <span className="ml-2 text-sm text-gray-600">(120 reviews)</span>
            </div>

            {/* Color */}
            <div>
              <p className="font-bold mb-1">Color</p>
              <div className="flex gap-3">
                {singleProduct?.colors?.map((color, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 rounded-full border border-gray-400"
                    style={{ backgroundColor: color.colorCode }}
                  ></span>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-8">
                <p className="font-bold mb-1 text-sm">SELECT SIZE</p>
                {!hasOneSize && (
                  <div>
                  <p className="text-xs text-yellow-700 mb-2 cursor-pointer flex items-end gap-1"
                  onClick={() => setShowPopup(true)}>
                    SIZE GUIDE{" "}
                    <span className="text-xl">
                      <LiaRulerCombinedSolid />
                    </span>
                  </p>
                  {showPopup && (
        <ShowSizes sizeOptions={sizeOptions} onClose={() => setShowPopup(false)} />
      )}
                  </div>
                )}
              </div>

              {hasOneSize ? (
                <div>
                  <button className="border-2 p-2 rounded-3xl text-yellow-700 font-bold test-sm border-yellow-700">
                    OneSize
                  </button>
                </div>
              ) : (
                <div className={`flex gap-3 ${shake ? "shake" : ""}`}>
                  {sizeOptions.map((size, index) => {
                    const isAvailable = singleProduct?.sizes?.some(
                      (s) => s === size._id
                    );
                    const isSelected = selectedSize === size.sizeLabel;

                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(size.sizeLabel)}
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
            </div>

            {/*Mobile Buttons */}

            <div className="flex w-full gap-4 py-2 px-1 md:hidden sticky bottom-0 bg-white">
              <div className="w-1/2">
                {!singleProduct?.stock ? (
                  <button
                    className="rounded w-full font-semibold border py-2 transition duration-300 bg-gray-400 text-gray-600 cursor-not-allowed border-gray-300"
                    disabled
                  >
                    OUT OF STOCK
                  </button>
                ) : (
                  
                    hasProductInCart ? (
                      <Link to={'/cart'}>
                      <button
                    className="flex items-center justify-center gap-2 rounded w-full font-semibold border py-2 transition duration-300 custom-button"
                  >
                    <BsFillHandbagFill />
                    GO TO BAG
                  </button>
                  </Link>
                    ) : (
                      <button
                    onClick={() =>
                      handleAddToCart({
                        _id: singleProduct?._id,
                        original_price: singleProduct?.original_price,
                        finel_price: singleProduct?.finel_price,
                        sizes: singleProduct?.sizes,
                        main_img: singleProduct?.main_img,
                        name: singleProduct?.name,
                        discount_percentage: singleProduct?.discount_percentage,
                        stock: singleProduct?.stock,
                        size: hasOneSize ? OneSize[0]?.sizeLabel : selectedSize,
                      })
                    }
                    className="flex items-center justify-center gap-2 rounded w-full font-semibold border py-2 transition duration-300 custom-button"
                  >
                    <BsFillHandbagFill />
                    ADD TO BAG
                  </button>
                    )
                  
                  
                )}
              </div>

              <div className="w-1/2">
                <button
                  className="flex items-center justify-center gap-2 text-black custom-button w-full font-semibold border border-black py-2 rounded transition duration-300"
                  onClick={handleAddToWishlist}
                >
                  <FaHeart
                    className={`md:text-2xl lg:text-lg cursor-pointer ${
                      hasProductInWishlist ? "text-red-600" : "text-white"
                    }`}
                  />
                  {hasProductInWishlist ? "WISHLISTED" : "WISHLIST"}
                </button>
              </div>
            </div>

            {/*Desktop Buttons */}
            <div className="flex w-full gap-4 md:pt-2 border-b-2 md:pb-5">
              <div className="hidden md:block w-1/2">
                {!singleProduct?.stock ? (
                  <button
                    className="rounded w-full font-semibold border py-2 transition duration-300 bg-gray-400 text-gray-600 cursor-not-allowed border-gray-300"
                    disabled
                  >
                    OUT OF STOCK
                  </button>
                ) : (
                  hasProductInCart ? (
                      <Link to={'/cart'}>
                      <button
                    className="flex items-center justify-center gap-2 rounded w-full font-semibold border py-2 transition duration-300 custom-button"
                  >
                    <BsFillHandbagFill />
                    GO TO BAG
                  </button>
                  </Link>
                    ) : (
                      <button
                    onClick={() =>
                      handleAddToCart({
                        _id: singleProduct?._id,
                        original_price: singleProduct?.original_price,
                        finel_price: singleProduct?.finel_price,
                        sizes: singleProduct?.sizes,
                        main_img: singleProduct?.main_img,
                        name: singleProduct?.name,
                        discount_percentage: singleProduct?.discount_percentage,
                        stock: singleProduct?.stock,
                        size: hasOneSize ? OneSize[0]?.sizeLabel : selectedSize,
                      })
                    }
                    className="flex items-center justify-center gap-2 rounded w-full font-semibold border py-2 transition duration-300 custom-button"
                  >
                    <BsFillHandbagFill />
                    ADD TO BAG
                  </button>
                    )
                )}
              </div>
              <div className="hidden md:block w-1/2">
                <button
                  className="flex items-center justify-center gap-2 text-black custom-button w-full font-semibold border border-black py-2 rounded transition duration-300"
                  onClick={handleAddToWishlist}
                >
                  <FaHeart
                    className={`md:text-2xl lg:text-lg cursor-pointer ${
                      hasProductInWishlist ? "text-red-600" : "text-white"
                    }`}
                  />
                  {hasProductInWishlist ? "WISHLISTED" : "WISHLIST"}
                </button>
              </div>
            </div>

            <div className="">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-sm font-bold">DELIVERY OPTIONS</h2>
                <CiDeliveryTruck className="text-gray-700 text-2xl" />
              </div>

              <div className="flex items-center gap-2 mb-1">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  className="border border-gray-300 px-3 py-2 text-sm rounded-md w-60 focus:outline-none"
                />
                <button className="text-yellow-700 text-sm font-semibold">
                  Check
                </button>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                Please enter PIN code to check delivery time & Pay on Delivery
                Availability
              </p>

              <ul className="text-xs text-gray-800 space-y-1">
                <li>✔ 100% Original Products</li>
                <li>✔ Pay on delivery is available</li>
                <li>✔ Easy 14 days returns and exchanges</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="container mx-auto grid grid-cols-3 mt-4">
        <div className="col-span-1 flex items-center">
          <div className="w-full border border-[rgb(68,67,67)]"></div>
        </div>
        <div className="col-span-1 text-sm md:text-xl lg:text-4xl text-center font font-bold color">
          SIMILAR PRODUCTS
        </div>
        <div className="col-span-1 flex items-center">
          <div className="w-full border border-[rgb(68,67,67)]"></div>
        </div>
      </div>

      <div className="max-w-fit mx-auto flex flex-wrap py-4 md:p-6 justify-between md:gap-6">
        {Array.isArray(allProduct) &&
          allProduct
            .filter((product) => product._id !== singleProduct?._id)
            .map((product, index) => {
              return loading ? (
                <div
                  key={index}
                  className="relative group p-3 bg-white overflow-hidden w-1/2 border md:border-none md:w-56 lg:w-60"
                >
                  {/* Wishlist Icon Placeholder */}
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
                  </div>
                </div>
              ) : (
                <ProductCard
                  key={index}
                  product={product}
                  API_BASE_URL={API_BASE_URL}
                  user={user}
                  dispatch={dispatch}
                  navigate={navigate}
                  toastNotify={toastNotify}
                />
              );
            })}
      </div>
    </>
  );
}

function ProductCard({ product, API_BASE_URL, user, dispatch, navigate, toastNotify }) {
  const [hovered, setHovered] = useState(false);

  const sliderSettings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    pauseOnHover: false,
    autoplaySpeed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imageSources = [
    `${product?.main_img}`,
    ...(product?.other_img || []).map(
      (img) => `${img}`
    ),
  ];

  const handleAddToWishlist = (product_id) => {
    if (!user) {
      navigate('/wishlist');
    }
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

  return (
    <div
          className="relative group p-3 cursor-pointer bg-white overflow-hidden w-1/2 border md:border-none md:w-56 lg:w-60 group hover:shadow-2xl transition-all lg:hover:scale-105 duration-300"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className="absolute right-5 z-10 lg:hidden top-4 bg-white p-1 rounded-full"
            onClick={() => handleAddToWishlist(product._id)}
          >
            <FaHeart
              className={`md:text-3xl lg:text-xl cursor-pointer ${
                user?.wishlist?.some(
                  (item) => item?._id?.toString() === product?._id?.toString()
                )
                  ? "text-red-600"
                  : "text-gray-400"
              }`}
            />
          </div>
          <div
            className="absolute right-5 z-10 hidden lg:group-hover:block top-4 bg-white p-1 rounded-full"
            onClick={() => handleAddToWishlist(product._id)}
          >
            <FaHeart
              className={`md:text-3xl lg:text-xl text-gray-400 ${
                user?.wishlist?.some(
                  (item) => item?._id?.toString() === product?._id?.toString()
                )
                  ? "text-red-600"
                  : "text-gray-400"
              }`}
            />
          </div>
      <Link to={`/detail/${product._id}`}>
        {/* Product Image or Slider */}
        <div className="w-full">
          {hovered && product.other_img?.length > 0 ? (
            <Slider {...sliderSettings} className="product-slider">
              {imageSources.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Product"
                  className="w-full h-64 md:h-72 cover"
                />
              ))}
            </Slider>
          ) : (
            <img
              src={imageSources[0]}
              alt="Product"
              className="w-full h-64 md:h-72 cover"
            />
          )}
        </div>
      </Link>

      {/* Product Details */}
      <div className="pt-3 text-center">
        <div>
          <img src="https://res.cloudinary.com/dbglxb4z0/image/upload/v1760000193/Brand_name_av79dx.png" alt="" className="w-10 mx-auto" />
        </div>
        <h3 className="truncate text-sm color font-medium">{product.name}</h3>

        {/* Price Details */}
        <div className="flex items-center justify-center gap-2 mt-1 whitespace-nowrap text-xs">
          <div className="text-zinc-800 font-bold">
            ₹{product.finel_price}
          </div>
          <span className="text-gray-500 line-through">
            {product.discount_percentage > 0 && `₹${product.original_price}`}
          </span>
          <span className="text-green-600 font-semibold">
            {product.discount_percentage > 0 &&
            `${product.discount_percentage} % off`}
          </span>
        </div>
      </div>
      {product?.top_selling && (
        <div className="bestseller-tag px-2 py-1 text-xs font-bold">
          <span className="bestseller-text">Bestseller</span>
          <span className="sparkle"></span>
        </div>
      )}
    </div>
  );
}
