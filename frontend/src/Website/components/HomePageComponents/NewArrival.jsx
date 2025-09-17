import React, { use, useContext, useEffect, useState } from 'react'
import { MainContext } from '../../../context/Context';
import Slider from 'react-slick';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function NewArrival() {

    const {
            API_BASE_URL, PRODUCT_URL
          } = useContext(MainContext);
    
          const [products, setProducts] = useState([]);

          const fetchNewArrivals = () => {
        axios.get(API_BASE_URL + PRODUCT_URL + '/new-arrivals/id').then(
          (success) => {
            setProducts(success.data.items);
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        )
      }

    const NextArrow = ({ onClick }) => (
        <div
          className="absolute top-1/2 right-5 md:-right-0 lg:-right-5 transform -translate-y-1/2 z-10 cursor-pointer color py-1 rounded-sm text-2xl bg-zinc-800  hover:bg-zinc-950"
          onClick={onClick}
        >
          <FaAngleRight className="text-white" />
        </div>
      );
    
      const PrevArrow = ({ onClick }) => (
        <div
          className="absolute top-1/2 left-5  md:-left-0 lg:-left-5 transform -translate-y-1/2 z-10 cursor-pointer color py-1 rounded-sm text-2xl bg-zinc-800  hover:bg-zinc-950"
          onClick={onClick}
        >
          <FaAngleLeft className="text-white" />
        </div>
      );

    const newArrival_settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(
      () => {
        fetchNewArrivals();
      }, []
    )

  return (
    <div className="w-[95%]">
              <Slider {...newArrival_settings}>

                {
                                Array.isArray(products)
                                &&
                                products?.map((product, index) => {
                                return(
                                  <Link to={`/detail/${product?._id}`} key={index}>
                                    <div>
                                  <img
                                    src={`${product?.main_img}`}
                                    alt=""
                                    className="w-60 h-64 md:h-80"
                                  />
                                </div>
                                </Link>
                                )
                            })
                             }
              </Slider>
            </div>
  )
}
