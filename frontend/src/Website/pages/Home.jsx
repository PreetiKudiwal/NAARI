import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import Saree from "../components/HomePageComponents/Saree";
import Lehenga from "../components/HomePageComponents/Lehenga";
import Anarkali from "../components/HomePageComponents/Anarkali";
import NewArrival from "../components/HomePageComponents/NewArrival";
import { MainContext } from "../../context/Context";
import SplashScreen from "../components/SplashScreen";

export default function Home() {
  const { showMobileSearchBar, setShowMobileSearchBar, setSearchTerm } = useContext(MainContext);
  const lehengaRef = useRef();
  const sareeRef = useRef();
  const suitRef = useRef();
  const [isLehengaVisible, setIsLehengaVisible] = useState(false);
  const [isSareeVisible, setIsSareeVisible] = useState(false);
  const [isSuitVisible, setIsSuitVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if splash has been shown before
    const hasShownSplash = localStorage.getItem("splashShown");

    if (!hasShownSplash) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem("splashShown", "true"); 
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  

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

  // Slider settings

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 1000, // Transition speed
    fade: true, // Enable fade effect
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 4000, // Time before switching slides
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "ease-in-out", // Smooth transition
  };


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === lehengaRef.current) {
              setIsLehengaVisible(true);
              observer.unobserve(entry.target);
            } else if (entry.target === sareeRef.current) {
              setIsSareeVisible(true);
              observer.unobserve(entry.target);
            } else if (entry.target === suitRef.current) {
              setIsSuitVisible(true);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.3 } // Adjust threshold as needed
    );

    if (lehengaRef.current) observer.observe(lehengaRef.current);
    if (sareeRef.current) observer.observe(sareeRef.current);
    if (suitRef.current) observer.observe(suitRef.current);

    return () => {
      if (lehengaRef.current) observer.unobserve(lehengaRef.current);
      if (sareeRef.current) observer.unobserve(sareeRef.current);
      if (suitRef.current) observer.unobserve(suitRef.current);
    };
  }, []);

  useEffect(
    () => {
      if (!showMobileSearchBar) {
        setShowMobileSearchBar(true);
      }
    },[showMobileSearchBar]
  )

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      <div className="pb-10 pt-5">
        {/* Banner section start */}
        <div className="w-full mt-4 lg:mt-4 pb-10">
          <div className="container mx-auto">
            <Slider {...settings}>
              {/* Slide 1 */}
              <div className="h-[250px] md:h-[550px] bg-cover bg-center bg-[url('/images/Banner1.png')]">
                <div className="flex justify-end items-center h-full p-4 md:p-32 text-white">
                  <div className="text-sm text-center flex flex-col md:gap-3 md:text-4xl font-semibold">
                    <div className="md:flex flex-col gap-8">
                      <div>
                        Get your{" "}
                        <span className="font text-xl md:text-6xl">
                          Lal Joda
                        </span>
                      </div>
                      <div>from our</div>
                      <div>
                        <span className="font text-xl md:text-6xl me-2">
                          Dulhan
                        </span>
                        Collection
                      </div>
                    </div>
                    <Link to={"/shop"}>
                      <button className=" md:w-[150px] rounded-md mt-2 py-0.5 px-2 md:p-2 text-xs  md:text-sm font-normal bg-black">
                        <div className="flex justify-center items-center gap-1">
                          Shop Now{" "}
                          <span className="rounded-2xl text-[6px] md:text-[10px] p-0.5 bg-white text-black border border-white">
                            <FaAngleRight />
                          </span>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="relative h-[250px] md:h-[550px]">
                <img
                  src="/images/Banner2.png"
                  alt=""
                  className="w-full h-full"
                />
                <div className="absolute top-0 flex justify-end items-center h-full p-4 md:p-32 text-white">
                  <div className="text-sm flex flex-col md:gap-3 md:text-4xl font-semibold text-center">

                    <div className="md:flex flex-col text-xl md:text-6xl font gap-8 text-center">
                      <div>turn every glance</div>
                      <div>into a </div>
                      <div>gaze — wear a Saree.</div>
                    </div>
                    <Link to={"/shop"}>
                      <button className=" md:w-[150px] rounded-md mt-2 py-0.5 px-2 md:p-2 text-xs  md:text-sm font-normal bg-black">
                        <div className="flex justify-center items-center gap-1">
                          Shop Now{" "}
                          <span className="rounded-2xl text-[6px] md:text-[10px] p-0.5 bg-white text-black border border-white">
                            <FaAngleRight />
                          </span>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Slide 3 */}
              <div className="relative h-[250px] md:h-[550px] bg-cover bg-[url('/images/Banner3.png')]">
                <div className="flex justify-end items-center h-full p-4 md:p-32 text-white">
                  <div className="text-sm text-center flex flex-col md:gap-3 md:text-4xl font-semibold">
                    <div className="md:flex flex-col text-xl md:text-6xl font gap-8">
                      <div>Celebrate yourself</div>
                      <div>in</div>
                      <div>every thread.</div>
                    </div>
                    <Link to={"/shop"}>
                      <button className=" md:w-[150px] rounded-md mt-2 px-2 py-0.5 md:p-2 text-xs md:text-sm font-normal bg-black">
                        <div className="flex justify-center items-center gap-1">
                          Shop Now{" "}
                          <span className="rounded-2xl text-[6px] md:text-[10px] p-0.5 bg-white text-black border border-white">
                            <FaAngleRight />
                          </span>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>

        {/* Banner section end */}

        {/* New Arrivals section start */}

        <div className="container mx-auto grid grid-cols-3 mt-4">
          <div className="col-span-1 flex items-center">
            <div className="w-full border border-[rgb(68,67,67)]"></div>
          </div>
          <div className="col-span-1 text-sm md:text-xl lg:text-4xl text-center font font-bold color">
            NEW ARRIVALS
          </div>
          <div className="col-span-1 flex items-center">
            <div className="w-full border border-[rgb(68,67,67)]"></div>
          </div>
        </div>

        <div className="grid grid-cols-10 items-center justify-between mt-8 mb-10 py-4">
          <div className="relative col-span-5 md:col-span-4 lg:col-span-2 bg-white">
            <img
              src="/images/slogan.jpg"
              alt=""
              className="w-full h-72 md:h-full"
            />
            <span className="absolute text-xl md:text-3xl lg:text-2xl font-semibold text-gray-800 top-[6rem] md:top-[6rem] lg:top-[5rem] left-[30%] naari-font">
              -: नारी :-
            </span>
          </div>

          <div className="col-span-5 md:col-span-6 lg:col-span-8 flex justify-between lg:justify-center bg-white">
            <NewArrival />
          </div>
        </div>

        {/* New Arrivals section end */}

        {/* Lehenga Section Start */}
        <div className="container mx-auto grid grid-cols-3 mt-4">
          <div className="col-span-1 flex items-center">
            <div className="w-full border border-[rgb(68,67,67)]"></div>
          </div>
          <div className="col-span-1 text-sm md:text-xl lg:text-4xl text-center font font-bold color">
            EXPLORE LEHENGAS
          </div>
          <div className="col-span-1 flex items-center">
            <div className="w-full border border-[rgb(68,67,67)]"></div>
          </div>
        </div>
        <div
          ref={lehengaRef}
          className={`transition-transform duration-700 ${
            isLehengaVisible ? "scale-100" : "scale-0"
          }`}
        >
          <div className="w-full mt-10">
            <Lehenga />
          </div>
        </div>

        {/* Lehenga section end */}

        {/* Saree section start */}

        <div className="container mx-auto grid grid-cols-3 mt-10">
          <div className="col-span-1 flex items-center">
            <div className="w-full border border-[rgb(68,67,67)]"></div>
          </div>
          <div className="col-span-1 text-sm md:text-xl lg:text-4xl text-center font font-bold color">
            TRENDING SAREES
          </div>
          <div className="col-span-1 flex items-center">
            <div className="w-full border border-[rgb(68,67,67)]"></div>
          </div>
        </div>

        <div
          ref={sareeRef}
          className={`transition-transform duration-700 ${
            isSareeVisible ? "scale-100" : "scale-0"
          }`}
        >
          <div className="w-full mt-10">
            <Saree />
          </div>
        </div>

        {/* Saree section end */}

        {/* Suit section start */}

        <div className="container mx-auto grid grid-cols-3 mt-10">
          <div className="col-span-1 flex items-center">
            <div className="w-full border border-[rgb(68,67,67)]"></div>
          </div>
          <div className="col-span-1 text-sm md:text-xl lg:text-4xl text-center font font-bold color">
            EXPLORE SUITS
          </div>
          <div className="col-span-1 flex items-center">
            <div className="w-full border border-[rgb(68,67,67)]"></div>
          </div>
        </div>

        <div
          ref={suitRef}
          className={`transition-transform duration-700 ${
            isSuitVisible ? "scale-100" : "scale-0"
          }`}
        >
          <div className="w-full mt-10">
            <Anarkali />
          </div>
        </div>

        {/* Suit section end */}

        {/* Dulhan section start */}

        <div className="container mx-auto grid grid-cols-3 mt-10 mb-10">
          <div className="col-span-1 flex items-center">
            <div className="w-full border border-[rgb(68,67,67)]"></div>
          </div>
          <div className="col-span-1 text-sm md:text-xl lg:text-4xl text-center font font-bold color">
            DULHAN COLLECTION
          </div>
          <div className="col-span-1 flex items-center">
            <div className="w-full border border-[rgb(68,67,67)]"></div>
          </div>
        </div>
        <div className="relative bg-gray-100 py-5">
          <div className="container mx-auto flex md:gap-5">
            <div className="w-1/2 lg:w-1/3 cursor-pointer bg-white">
              <div className="w-full h-80 md:h-96 lg:h-[480px] overflow-hidden">
                <img
                  src="/images/redLehenga5.png"
                  alt=""
                  className="w-full h-full hover:scale-110 transition duration-300"
                />
              </div>
              <div className="text-center font pt-2">
                <h1 className="text-2xl md:text-4xl font-bold">Traditional</h1>
                <div className="font-bold md:text-xl">
                  Deep scarlet silver embroidered lehenga set
                </div>
              </div>
            </div>

            <div className="w-1/3 cursor-pointer bg-white hidden lg:block">
              <div className="w-full h-[480px] overflow-hidden">
                <img
                  src="/images/redLehenga4.png"
                  alt=""
                  className="w-full h-full hover:scale-110 transition duration-300"
                />
              </div>
              <div className="text-center font pt-2">
                <h1 className="text-4xl font-bold">Classic</h1>
                <div className="font-bold text-xl">
                  Dark red silver embroidered lehenga set
                </div>
              </div>
            </div>

            <div className="w-1/2 lg:w-1/3 cursor-pointer bg-white">
              <div className="w-full h-80 md:h-96 lg:h-[480px] overflow-hidden">
                <img
                  src="/images/redLehenga3.png"
                  alt=""
                  className="w-full h-full hover:scale-110 transition duration-300"
                />
              </div>
              <div className="text-center font pt-2">
                <h1 className="text-2xl md:text-4xl font-bold">Elegent</h1>
                <div className="font-bold md:text-xl">
                  Maroon silver embroidered lehenga set
                </div>
              </div>
            </div>
          </div>
          <Link to={'/shop'}>
          <div 
          onClick={() => setSearchTerm("bridal lehengas")}
          className="absolute top-[40%] md:top-1/2 right-1 md:right-3 transform -translate-y-1/2 text-[10px] md:text-sm bg-black p-1 md:p-2 text-white cursor-pointer rounded">
            <div className="flex items-center gap-1 md:gap-2">
              Explore Now{" "}
              <span className="text-black bg-white px-0.5 md:px-1 rounded">
                <FaArrowRightLong />
              </span>
            </div>
          </div>
          </Link>
        </div>

        {/* Dulhan section end */}
      </div>
    </>
  );
}
