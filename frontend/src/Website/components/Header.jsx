import React, { useState, useEffect } from "react";
import { FaRegHeart, FaSearch, FaUser } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserLogout } from "../../Redux/Reducer/UserSlice";

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const cart = useSelector((state) => state.cart.data);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowMobileSearch(false); // Scroll down → hide
      } else {
        setShowMobileSearch(true); // Scroll up → show
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Hamburger Icon (Mobile Only) */}
        <div className="md:hidden">
          <button className="mt-3 pe-3" onClick={() => setToggle(true)}>
            <GiHamburgerMenu size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex-1 text-start md:text-left md:flex-none">
          <span className="text-3xl font-mono font-bold text-gray-900">
            Trove
          </span>
        </div>

        {/* Search Bar (Desktop Only) */}
        <div className="relative w-1/3 hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 ps-14 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:border-gray-200 focus:bg-white"
          />
          <FaSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-center items-center space-x-6">
          {["/", "/shop", "/about", "/contact"].map((path, idx) => {
            const label = ["Home", "Shop", "About", "Contact"][idx];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative group px-4 py-2 text-base font-medium transition duration-300 ${
                    isActive
                      ? "text-[#967b2a]"
                      : "text-gray-800 hover:text-[#967b2a]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className={`absolute left-0 bottom-0 w-full h-0.5 bg-[#967b2a] transform scale-0 transition-transform duration-500 origin-center ${
                        isActive ? "scale-100" : ""
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Icons: Wishlist, Cart, Login */}
        <div className="flex items-center space-x-4">
          {/* <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `text-xl transition ${
                isActive
                  ? "text-[#967b2a]"
                  : "text-gray-800 hover:text-[#967b2a]"
              }`
            }
          >
            <FaRegHeart />
          </NavLink> */}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative text-2xl transition ${
                isActive
                  ? "text-[#967b2a]"
                  : "text-gray-800 hover:text-[#967b2a]"
              }`
            }
          >
            <TiShoppingCart />
            <span className="absolute -top-3 -right-3 bg-gray-800 text-white text-xs px-1.5 py-0.5 font-medium rounded-full">
              {cart.length}
            </span>
          </NavLink>

          {user ? (
            <>
              <div className="flex justify-center items-center">
                <span className="px-1 text-gray-800 font-medium min-w-[100px] rounded-sm">
                  Hello, {user?.name}
                </span>
                <FaUser className="text-xl" />
                <button className=" text-gray-800 py-1 ps-2 rounded-md hover:text-[#967b2a] text-base font-medium transition">
                  Profile
                </button>
              </div>
            </>
          ) : (
            <Link to={`/userlogin?ref=home`}>
              <div className="flex justify-center items-center">
                <FaUser className="text-xl" />
                <button className=" text-gray-800 py-1 ps-2 rounded-md hover:text-[#967b2a] text-base font-medium transition">
                  Login
                </button>
              </div>
            </Link>
          )}
          <button
            onClick={() => dispatch(UserLogout())}
            className=" text-red-800 py-1 ps-2 text-base font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out fixed w-full top-15 ${
          showMobileSearch
            ? "h-auto opacity-100"
            : "h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="relative mb-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 ps-14 border rounded-lg focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Overlay */}
      {toggle && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setToggle(false)}
        ></div>
      )}

      {/* Mobile Slide-In Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-[60%] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          toggle ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo and Close */}
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <span className="text-3xl font-mono font-bold text-gray-900">
            Trove
          </span>
          <button onClick={() => setToggle(false)}>
            <RxCross2 size={24} />
          </button>
        </div>

        {/* Menu Title */}
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <span className="text-xl font-bold">Menu</span>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col px-6 py-4 space-y-4">
          {["/", "/shop", "/about", "/contact"].map((path, idx) => {
            const label = ["Home", "Shop", "About", "Contact"][idx];
            return (
              <NavLink
                key={path}
                to={path}
                onClick={() => setToggle(false)}
                className="text-gray-800 text-base hover:text-[#967b2a] transition"
              >
                {label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
