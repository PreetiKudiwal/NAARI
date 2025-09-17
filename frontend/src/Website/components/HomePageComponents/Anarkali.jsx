import React, { use, useContext, useEffect, useState } from 'react'
import { MainContext } from '../../../context/Context';
import Slider from 'react-slick';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Anarkali() {
  const {
        API_BASE_URL, PRODUCT_URL
      } = useContext(MainContext);

      const [products, setProducts] = useState([]);

      const fetchSuits = () => {
              axios.get(API_BASE_URL + PRODUCT_URL + '/salwar/68a851640d5f3fb09771aded').then(
                (success) => {
                  setProducts(success.data.salwar);
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

      const Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToShow: 5,
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
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

      useEffect(
          () => {
            fetchSuits();
          }, []
        )

  return (
    <div className='container mx-auto'>
        <Slider {...Settings} className="ps-2">
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
                    className="w-60 h-80 rounded-md"
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
