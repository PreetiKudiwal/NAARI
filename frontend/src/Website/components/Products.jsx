import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Context";
import Slider from "react-slick";
import { data, Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../Redux/Reducer/UserSlice";
import axios from "axios";

export default function Products({ priceRange, size, categorySlug, limit }) {
  const {
    API_BASE_URL,
    fetchAllproduct,
    allProduct,
    toastNotify,
    productColor,
    searchTerm,
    setSearchTerm,
  } = useContext(MainContext);
  const user = useSelector((state) => state.user.data);
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    fetchAllproduct();
    setTimeout(() => {
       setLoading(false);
    }, 600);
  }, [priceRange, size, categorySlug, limit, productColor]);

  function normalizeWord(word) {
  word = word.toLowerCase();

  // Basic plural → singular rules
  if (word.endsWith("ies")) {
    return word.slice(0, -3) + "y"; // sarees → saree
  }
  if (word.endsWith("es")) {
    return word.slice(0, -2); // dresses → dress
  }
  if (word.endsWith("s") && word.length > 3) {
    return word.slice(0, -1); // suits → suit
  }

  return word;
}

  const searchWords = searchTerm.toLowerCase().split(" ").map(normalizeWord);

const filteredProducts = allProduct?.filter((product) => {
  const productName = normalizeWord(product.name.toLowerCase());
  const categoryName = normalizeWord(product.category_id.categoryName.toLowerCase());
  const colorName = normalizeWord(product.colors[0]?.colorName.toLowerCase() || "");

  return searchWords.every((word) =>
    productName.includes(word) ||
    categoryName.includes(word) ||
    colorName.includes(word)
  );
});

   useEffect(() => {
  const saved = localStorage.getItem("searchTerm");
  if (saved) setSearchTerm(saved);
}, []);

useEffect(() => {
    setLoadingProduct(true);
    setTimeout(() => {
      setLoadingProduct(false);
    }, 300);
  }, []);

  return (
    <>
    {
      !allProduct || allProduct.length === 0 ? 
      (
        <div className="flex flex-wrap md:p-6 justify-between lg:justify-start md:gap-4 lg:gap-9">
        {
        [1,2].map(
          (nub, idx) => {
            <div
              key={idx}
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
          }
        )
      }
        </div>
      ) :
      (
        <div className="flex flex-wrap md:p-6 justify-between lg:justify-start md:gap-4 lg:gap-9">
      {
        filteredProducts?.length === 0 ? 
        (
          <div className="w-full min-h-svh flex mt-20 md:mt-10 justify-center">
          <div className="text-center flex flex-col items-center">
            <div className="w-60 md:w-80">
              <img
                src="/images/NoProductFound4.png"
                alt="NoProductFound"
                className="w-full h-full"
              />
            </div>
            <div className="text-sm font-bold color">We couldn't find any matches!</div>
            <div className="text-sm font-medium color px-5">Please check the spelling or try searching something else.</div>
          </div>
        </div>
        ) :
        (
          Array.isArray(filteredProducts) &&
        filteredProducts.map((product, index) => {
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
              toastNotify={toastNotify}
            />
          );
        })
        )
      }
      
    </div>
      )
    }
    
  </>
  );
}

function ProductCard({ product, API_BASE_URL, user, dispatch, toastNotify }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  console.log(product, 'product');
  console.log(API_BASE_URL, 'API_BASE_URL');
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
    `${product.main_img}`,
    ...(product.other_img || []).map(
      (img) => `${img}`
    ),
  ];

  const handleAddToWishlist = (product_id) => {
    if (!user) {
      navigate("/wishlist");
    }
    axios
      .put(API_BASE_URL + "/user/addtowishlist", {
        user_id: user?._id,
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
        onClick={() => handleAddToWishlist(product?._id)}
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
        onClick={() => handleAddToWishlist(product?._id)}
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
          <img src="/images/Brand_name.png" alt="" className="w-10 mx-auto" />
        </div>
        <h3 className="w-full truncate text-sm color font-medium">{product.name}</h3>

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
