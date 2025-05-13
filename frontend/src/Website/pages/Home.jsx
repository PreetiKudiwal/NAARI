import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      {/* slider section start */}
      <div className="relative w-full bg-gray-100 pt-3 pb-10">
        <div className="container mx-auto">
          <Slider {...settings}>
            {/* Slide 1 */}
            <div className="relative h-[350px] md:h-[550px] bg-cover bg-center bg-[url('/images/slide-04.jpg')]">
              <div className="flex flex-col justify-center h-full p-4 md:p-10 text-white bg-black/50">
                <span className="text-2xl md:text-4xl font-semibold">
                  Women Collection 2025
                </span>
                <h2 className="text-3xl md:text-6xl font-bold my-2 md:my-4">
                  New arrivals
                </h2>
                <Link to={"/shop/:slug?"}>
                  <button className="w-[130px] md:w-[150px] rounded-md mt-2 p-2 text-base md:text-xl font-medium bg-gray-800 hover:bg-gray-900 transition duration-300">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="relative h-[350px] md:h-[550px] bg-cover bg-center bg-[url('/images/slide-03.jpg')]">
              <div className="flex flex-col justify-center h-full p-4 md:p-10 text-white bg-black/50">
                <span className="text-2xl md:text-4xl font-semibold">
                  Men Collection 2025
                </span>
                <h2 className="text-3xl md:text-6xl font-bold my-2 md:my-4">
                  New arrivals
                </h2>
                <button className="w-[130px] md:w-[150px] rounded-md mt-2 p-2 text-base md:text-xl font-medium bg-gray-800 hover:bg-gray-900 transition duration-300">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="relative h-[350px] md:h-[550px] bg-cover bg-center bg-[url('/images/slide-02.jpg')]">
              <div className="flex flex-col justify-center h-full p-4 md:p-10 text-white bg-black/50">
                <span className="text-2xl md:text-4xl font-semibold">
                  Men New-Season
                </span>
                <h2 className="text-3xl md:text-6xl font-bold my-2 md:my-4">
                  Jackets & Coats
                </h2>
                <button className="w-[130px] md:w-[150px] rounded-md mt-2 p-2 text-base md:text-xl font-medium bg-gray-800 hover:bg-gray-900 transition duration-300">
                  Shop Now
                </button>
              </div>
            </div>
          </Slider>
        </div>
      </div>

      {/* slider section end */}
    </>
  );
}
