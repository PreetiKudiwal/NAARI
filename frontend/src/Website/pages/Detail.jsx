import React, { use, useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Context";
import { useParams } from "react-router-dom";
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
  } = useContext(MainContext);
  console.log(allProduct, "allproduct in detail");
  const { product_id } = useParams();
  const [selectedImg, setSelectedImg] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const slug = singleProduct?.category_id?.categorySlug;
  console.log(slug);
  console.log(product_id);
  console.log(singleProduct);
  const [selectedSize, setSelectedSize] = useState(null);
  console.log(selectedSize, "selectedSize");
  const [shake, setShake] = useState(false);

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

  const handleAddToCart = (data) => {
    if (!selectedSize) {
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
          size: selectedSize,
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
    fetchSingleProduct(product_id);
  }, [product_id]);

  useEffect(() => {
    fetchAllproduct(null, 6, slug);
  }, [slug]);

  useEffect(() => {
    if (singleProduct && singleProduct?.main_img) {
      setSelectedImg(singleProduct?.main_img); // default to main image
    }
  }, [singleProduct]);

  useEffect(() => {
    fetchAllSize();
  }, []);

  const isAnySizeAvailable = Array.isArray(allSize) && allSize.some((size) =>
  singleProduct?.sizes?.includes(size._id)
);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:mt-8 lg:mt-0">
        {/* Left Section - Images */}

        {/* mobile */}

        <div className="md:hidden mt-4">
          {Array.isArray(singleProduct?.other_img) &&
          singleProduct?.other_img.length === 0 ? (
            <div className="w-full h-[500px]">
              <img
                src={`${API_BASE_URL}/images/product/${singleProduct?.main_img}`}
                alt={`thumb-main_img`}
                className="w-full h-full cursor-pointer bg-white focus:outline-none"
              />
            </div>
          ) : (
            <Slider {...settings}>
              <div className="w-full h-[500px]">
                <img
                  src={`${API_BASE_URL}/images/product/${singleProduct?.main_img}`}
                  alt={`thumb-main_img`}
                  className="w-full h-full cursor-pointer bg-white focus:outline-none"
                />
              </div>
              {Array.isArray(singleProduct?.other_img) &&
                singleProduct?.other_img.map((image, index) => {
                  const fullImgPath = `${API_BASE_URL}/images/product/${image}`;
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
        </div>

        {/* desktop */}
        <div className="hidden md:block">
          <div className="flex justify-around gap-5 lg:gap-0 sticky top-24">
            <div className="space-y-2">
              <img
                src={
                  API_BASE_URL + `/images/product/${singleProduct?.main_img}`
                }
                alt="Main Product"
                className={`w-20 h-28 cursor-pointer border-2 rounded ${
                  singleProduct?.main_img === selectedImg
                    ? "border-yellow-700"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImg(singleProduct?.main_img)}
              />
              {Array.isArray(singleProduct?.other_img) &&
                singleProduct?.other_img.map((image, index) => {
                  const fullImgPath = `${API_BASE_URL}/images/product/${image}`;
                  const isSelected = image === selectedImg;
                  return (
                    <img
                      key={index}
                      src={fullImgPath}
                      alt={`thumb-${index}`}
                      className={`w-20 h-28 cursor-pointer border-2 rounded ${
                        isSelected ? "border-yellow-700" : "border-gray-300"
                      }`}
                      onClick={() => setSelectedImg(image)}
                    />
                  );
                })}
            </div>

            <div className="group overflow-hidden cursor-zoom-in">
              <img
                src={API_BASE_URL + `/images/product/${selectedImg}`}
                alt="Main Product"
                className="w-[450px] h-[500px] group-hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="space-y-4">
          <div>
            <img src="/images/Brand_name.png" alt="" className="w-14" />
          </div>
          <p className="text-black font-medium text-lg">
            {singleProduct?.name}
          </p>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-black">
              ₹{singleProduct?.finel_price}
            </span>
            <span className="line-through text-gray-500">
              ₹{singleProduct?.original_price}
            </span>
            <span className="text-green-600 font-semibold">
              {singleProduct?.discount_percentage}% off
            </span>
          </div>

          {/* Reviews */}
          <div className="flex items-center text-yellow-500">
            {"★★★★★"}
            <span className="ml-2 text-sm text-gray-600">(120 reviews)</span>
          </div>

          {/* Color */}
          <div>
            <p className="font-medium mb-1">Color</p>
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
              <p className="font-medium mb-1">SELECT SIZE</p>
              <p className="text-xs text-yellow-700 mb-2 cursor-pointer flex items-end gap-1">
                SIZE GUIDE{" "}
                <span className="text-xl">
                  <LiaRulerCombinedSolid />
                </span>
              </p>
            </div>

            <div className={`flex gap-3 ${shake ? "shake" : ""}`}>
              {allSize.map((size, index) => {
                const isAvailable = singleProduct?.sizes?.some(
                  (s) => s === size._id
                );
                const isSelected = selectedSize === size.sizeLabel;

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size.sizeLabel)}
                    className={`w-12 h-12 rounded-full text-sm font-bold
  ${isAvailable ? "hover:border-yellow-700" : "text-gray-400 cursor-not-allowed  hover:border-gray-400"}
  ${isSelected ? "border-2 border-yellow-700 text-yellow-700" : "border-2 border-gray-400 text-black "}`}

        //             className={`border text-sm w-12 h-12 rounded-full 
        //   ${
        //     isAvailable
        //       ? "border-zinc-800 text-black hover:border-red-700"
        //       : "text-gray-400 cursor-not-allowed"
        //   }
        //   ${isSelected ? "border-red-700 text-red-700" : ""}
        // `}
                    disabled={!isAvailable}
                  >
                    {size.sizeLabel}
                  </button>
                );
              })}
            </div>

            {/* <div className="flex gap-3">
              {allSize.map((size, index) => {
                const isAvailable = singleProduct?.sizes?.some(
                  (s) => s === size._id
                );

                return (
                  <button
                    key={index}
                    className={`border text-sm border-gray-300 w-12 h-12 rounded-full text-gray-300 ${
                      isAvailable ? "border-gray-900 color hover:border-yellow-700" : ""
                    }`}
                  >
                    {size.sizeLabel}
                  </button>
                );
              })}
            </div> */}
          </div>

          {/*Mobile Buttons */}

          <div className="flex w-full gap-4 py-2 px-1 md:hidden sticky bottom-0 bg-white">
            <div className="w-1/2">
              <button
                onClick={() =>
                  handleAddToCart({
                    _id: singleProduct?._id,
                    original_price: singleProduct?.original_price,
                    finel_price: singleProduct?.finel_price,
                    size: selectedSize,
                  })
                }
                className={`flex items-center justify-center gap-2 rounded w-full font-semibold border py-2 transition duration-300 ${
    isAnySizeAvailable
      ? "custom-button"
      : "bg-gray-400 text-gray-600 cursor-not-allowed border-gray-300"
  }`}
                disabled={!isAnySizeAvailable}
              >
                <BsFillHandbagFill />
                ADD T0 BAG
              </button>
            </div>
            <div className="w-1/2">
              <button className="custom-button">
                ❤ WISHLIST
              </button>
            </div>
          </div>

          {/*Desktop Buttons */}
          <div className="flex w-full gap-4 pt-2 border-b-2 pb-5">
            <div className="w-1/2 hidden md:block">
              <button
                onClick={() =>
                  handleAddToCart({
                    _id: singleProduct?._id,
                    original_price: singleProduct?.original_price,
                    finel_price: singleProduct?.finel_price,
                    size: selectedSize,
                  })
                }
                className={`flex items-center justify-center gap-2 rounded w-full font-semibold border py-2 transition duration-300 ${
    isAnySizeAvailable
      ? "custom-button"
      : "bg-gray-400 text-gray-600 cursor-not-allowed border-gray-300"
  }`}
                disabled={!isAnySizeAvailable}
              >
                <BsFillHandbagFill />
                ADD T0 BAG
              </button>
            </div>
            <div className="hidden md:block w-1/2">
              <button className="flex items-center justify-center gap-2 text-black custom-button w-full font-semibold border border-black py-2 rounded transition duration-300">
                ❤ WISHLIST
              </button>
            </div>
          </div>

          <div className="">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-medium">DELIVERY OPTIONS</h2>
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

            <ul className="text-sm text-gray-800 space-y-1">
              <li>✔ 100% Original Products</li>
              <li>✔ Pay on delivery might be available</li>
              <li>✔ Easy 14 days returns and exchanges</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-3 mt-4">
        <div className="col-span-1 flex items-center">
          <div className="w-full border border-[rgb(68,67,67)]"></div>
        </div>
        <div className="col-span-1 text-[9px] md:text-xl lg:text-4xl text-center font font-bold color">
          SIMILAR PRODUCTS
        </div>
        <div className="col-span-1 flex items-center">
          <div className="w-full border border-[rgb(68,67,67)]"></div>
        </div>
      </div>

      <div className="container mx-auto flex flex-wrap md:p-6 justify-between lg:justify-start md:gap-4 lg:gap-9">
        {Array.isArray(allProduct) &&
          allProduct
            .filter((product) => product._id !== singleProduct?._id)
            .map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                API_BASE_URL={API_BASE_URL}
              />
            ))}
      </div>
    </>
  );
}

function ProductCard({ product, API_BASE_URL }) {
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
    API_BASE_URL + `/images/product/${product?.main_img}`,
    ...(product?.other_img || []).map(
      (img) => API_BASE_URL + `/images/product/${img}`
    ),
  ];

  return (
    <div
      className="relative p-3 cursor-pointer bg-white overflow-hidden w-1/2 border md:border-none md:w-56 lg:w-60 group hover:shadow-2xl transition-all lg:hover:scale-105 duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
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
          <img src="/images/Brand_name.png" alt="" className="w-10 mx-auto" />
        </div>
        <h3 className="text-md font-semibold color">{product.name}</h3>

        {/* Price Details */}
        <div className="flex items-center justify-center gap-2">
          <div className="text-md font-bold color">
            ₹{product.finel_price.toFixed(1)}
          </div>
          <span className="text-sm text-gray-500 line-through">
            ₹{product.original_price}
          </span>
          <span className="text-sm text-green-600 font-semibold">
            {product.discount_percentage}% off
          </span>
        </div>
      </div>
    </div>
  );
}
