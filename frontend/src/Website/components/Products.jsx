import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Context";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Reducer/CartSlice";
import axios from "axios";

export default function Products() {
  const { API_BASE_URL, fetchAllproduct, allProduct } = useContext(MainContext);

  useEffect(() => {
    fetchAllproduct();
  }, []);

  return (
    <div className="p-4 flex flex-wrap gap-5">
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

function ProductCard({ product, API_BASE_URL }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const handleAddToCart = (data) => {
    dispatch(addToCart(data));
    if (user) {
      axios.post(API_BASE_URL + '/user/addtocart', {
        user_id: user._id,
        product_id: product._id
      }).then(
        (success) => {
          console.log(success);
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      )
      
    }
  }

  const [hovered, setHovered] = useState(false);

  const sliderSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imageSources = [
    API_BASE_URL + `/images/product/${product.main_img}`,
    ...(product.sub_images || []).map(img => API_BASE_URL + `/images/product/${img}`)
  ];

  return (
    <div
      className="relative bg-blue-100 overflow-hidden w-60 group hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image or Slider */}
      <div className="w-full h-64">
        {hovered && product.sub_images?.length > 0 ? (
          <Slider {...sliderSettings}>
            {imageSources.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Product"
                className="w-full h-64 cover"
              />
            ))}
          </Slider>
        ) : (
          <img
            src={imageSources[0]}
            alt="Product"
            className="w-full h-64 cover"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="p-3">
        <h3 className="text-md font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category_id.categoryName}</p>

        {/* Price Details */}
        <div className="flex items-center gap-2">
          <div className="text-md font-bold text-gray-900">
            ${product.finel_price.toFixed(1)}
          </div>
          <span className="text-sm text-gray-500 line-through">
            ${product.original_price}
          </span>
          <span className="text-sm text-green-600 font-semibold">
            {product.discount_percentage}% OFF
          </span>
        </div>
        <div>
        <button onClick={() => handleAddToCart(
          {
            product_id: product._id, 
            original_price: product.original_price, 
            finel_price: product.finel_price
          }
          )} className="bg-blue-500 w-full rounded-md text-white py-1 mt-2">Add to Cart</button>
      </div>
      </div>

      
    </div>
  );
}
