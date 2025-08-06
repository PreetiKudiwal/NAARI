import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Context";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

export default function Products() {

  const { API_BASE_URL, fetchAllproduct, allProduct } = useContext(MainContext); 

  useEffect(() => {
    fetchAllproduct();
  }, []);
  
  return (
    <div className="flex flex-wrap md:p-6 justify-between lg:justify-start md:gap-4 lg:gap-9">
      {Array.isArray(allProduct) &&
        allProduct.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            API_BASE_URL={API_BASE_URL}
          />
        ))}
    </div>
  );
}

function ProductCard({ product, API_BASE_URL}) {
  

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
    API_BASE_URL + `/images/product/${product.main_img}`,
    ...(product.other_img || []).map(img => API_BASE_URL + `/images/product/${img}`)
  ];

  return (
    <div
      className="relative group p-3 cursor-pointer bg-white overflow-hidden w-1/2 border md:border-none md:w-56 lg:w-60 group hover:shadow-2xl transition-all lg:hover:scale-105 duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute right-5 z-10 hidden group-hover:block top-4"><FaHeart className="md:text-3xl lg:text-xl text-gray-400 hover:text-red-600" /></div>
      
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
          <img src="/images/Brand_name.png" alt=""  className="w-10 mx-auto" />
        </div>
        <h3 className="text-md font-semibold color">{product.name}</h3>

        {/* Price Details */}
        <div className="flex items-center justify-center gap-2">
          <div className="text-md font-bold color">
            ₹{product.finel_price}
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
