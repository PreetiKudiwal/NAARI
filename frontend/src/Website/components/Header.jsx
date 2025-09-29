import React, { useState, useEffect, useContext, use } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserLogout } from "../../Redux/Reducer/UserSlice";
import { emptyCart } from "../../Redux/Reducer/CartSlice";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { MainContext } from "../../context/Context";

export default function Header() {
  const {
    searchTerm,
    setSearchTerm,
    showMobileSearchBar,
    setShowMobileSearchBar,
    toastNotify,
  } = useContext(MainContext);
  const [toggle, setToggle] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [index, setIndex] = useState(0);
  const cart = useSelector((state) => state.cart.data);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const words = ["Lehengas", "Sarees", "Suits"];

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

  useEffect(() => {
    if (searchTerm) {
      localStorage.setItem("searchTerm", searchTerm);
    } else {
      localStorage.removeItem("searchTerm"); // remove if empty
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/shop`);
    }
  };

  //Mobile Menu

  useEffect(() => {
    if (toggle) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`; // prevent layout shift
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px"; // reset
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [toggle]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setShowMobileSearchBar(true);
    } else {
      setShowMobileSearchBar(false);
    }
  }, [location.pathname]);

  //logout notification after reload
  useEffect(() => {
  const message = localStorage.getItem("logoutMessage");
  if (message) {
    toastNotify(message, 1); //  Show notification after reload
    localStorage.removeItem("logoutMessage"); // Clear it
  }
}, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto ps-4 pe-7 flex justify-between items-center relative">
        {/* Hamburger Icon (Mobile Only) */}
        <div className="lg:hidden">
          <button onClick={() => setToggle(true)}>
            <GiHamburgerMenu className="md:text-2xl over" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex-1 text-start lg:text-left lg:flex-none cursor-pointer">
          <Link to={"/"}>
            <img src="/images/logo.png" alt="logo" className="w-11 md:w-16" />
          </Link>
        </div>

        {/* Search Bar (Desktop Only) */}
        <div className="relative w-1/3 hidden lg:block">
          <input
            type="text"
            placeholder="Seach for"
            className="w-full p-2 ps-14 border border-zinc-700 rounded-full focus:outline-none placeholder:text-zinc-800 placeholder:text-sm"
            onChange={(e) => setSearchTerm(e.target.value)} //  update state
            onKeyDown={handleSearch} //  search on Enter
            value={searchTerm} // controlled input
          />
          <IoSearch className="absolute left-3 top-2.5 w-5 h-5 color" />

          {/* Animated Placeholder Text */}
          {searchTerm === "" && (
            <span className="absolute left-32 top-1/2 -translate-y-1/2 text-zinc-800 text-sm pointer-events-none overflow-hidden h-5">
              <span key={index} className="block animate-slide">
                "{words[index]}"
              </span>
            </span>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex justify-center items-center space-x-6">
          {["/", "/shop", "/about", "/contact"].map((path, idx) => {
            const label = ["Home", "Shop", "About", "Contact"][idx];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative text-base font-medium transition duration-300 ${
                    isActive ? "text-red-800" : "text-black"
                  } group`
                }
              >
                <span className="relative w-full px-4  py-2 inline-block">
                  {label}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 w-full bg-red-800 transform transition-transform duration-300 ease-in-out 
              ${"scale-x-0 group-hover:scale-x-100"}
              origin-right group-hover:origin-left`}
                  />
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Icons: Wishlist, Cart, Login */}
        <div className="flex items-center space-x-4">
          {location.pathname !== "/" && (
            <div onClick={() => setShowMobileSearchBar(!showMobileSearchBar)}>
              <IoSearch className="text-xl md:text-3xl lg:hidden" />
            </div>
          )}

          <div
            className="relative group cursor-pointer transition py-3 hidden lg:block"
            onMouseEnter={() => setShowUserPopup(true)}
            onMouseLeave={() => setShowUserPopup(false)}
          >
            <FaRegUser className="text-lg ms-2 md:text-3xl lg:text-lg hover:text-red-800" />
            {showUserPopup && (
              <div
                className="absolute -left-20 top-10 w-[200px] bg-white border shadow-2xl rounded p-4 
                opacity-0 invisible translate-y-2 group-hover:translate-y-0 
                group-hover:opacity-100 group-hover:visible 
                transition-all duration-300 ease-in-out z-50"
              >
                <div>
                  {user ? (
                    <div className="border-b text-xs space-y-2 pb-2 ">
                      <div className="font-semibold">Hello {user?.name}</div>
                      <div>{user?.contact}</div>
                    </div>
                  ) : (
                    <div className="border-b text-xs pb-2 ">
                      <div className="font-semibold">Welcome</div>
                      <Link to={"/userlogin?ref=home"}>
                        <div className="text-yellow-700 font-bold mt-1">
                          Login
                        </div>
                      </Link>
                    </div>
                  )}

                  <div className="border-b text-xs py-2 ">
                    <Link to={"/my/orders"}>
                      <div className="cursor-pointer hover:font-semibold">
                        Orders
                      </div>
                    </Link>
                    <Link to={"wishlist"}>
                      <div className="cursor-pointer hover:font-semibold mt-1">
                        Wishlist
                      </div>
                    </Link>
                  </div>

                  <div className="text-xs space-y-2 py-2 ">
                    <Link to={"/my/profile"}>
                      <div className="cursor-pointer hover:font-semibold">
                        Profile
                      </div>
                    </Link>
                    {user && (
                      <div
                        className="cursor-pointer hover:font-semibold"
                        onClick={() => {
                          dispatch(UserLogout());
                          navigate("/");
                          setShowUserPopup(false);
                          dispatch(emptyCart());
                          localStorage.setItem("logoutMessage", "Logged out successfully!");
                          window.location.reload();

                        }}
                      >
                        Logout
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `text-xl text-black hover:text-red-800 ${
                isActive ? "text-red-800" : ""
              }`
            }
          >
            <FaRegHeart className="md:text-3xl lg:text-xl" />
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `text-2xl text-black hover:text-red-800 relative ${
                isActive ? "text-red-800" : ""
              }`
            }
          >
            <HiOutlineShoppingBag className="text-xl md:text-3xl lg:text-[21px]" />
            <span className="absolute -top-3 -right-2  text-black text-xs px-1.5 py-0.5 font-bold rounded-full">
              {cart.length === 0 ? '' : cart.length}
            </span>
          </NavLink>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearchBar && (
        <div
          className={`lg:hidden fixed w-full  top-15 transition-all origin-top duration-500 ease-in-out transform ${
            showMobileSearch
              ? "scale-y-100 opacity-100"
              : " scale-y-0 opacity-0"
          }`}
        >
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Search for"
              className="w-full p-2 ps-14 md:p-4 md:ps-16 border rounded-b-lg focus:outline-none placeholder:text-sm text-gray-400"
              onChange={(e) => setSearchTerm(e.target.value)} //  update state
              onKeyDown={handleSearch} // search on Enter
              value={searchTerm} //  controlled input
            />
            <IoSearch className="absolute left-8 top-[15px] md:text-2xl md:top-[30%] text-gray-400" />

            {/* Animated Placeholder Text */}
            {searchTerm === "" && (
              <span className="absolute left-32 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none overflow-hidden h-5">
                <span key={index} className="block animate-slide">
                  "{words[index]}"
                </span>
              </span>
            )}
          </div>
        </div>
      )}

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
        <div className="flex justify-between items-center px-4 border-b">
          <div>
            <img src="/images/logo.png" alt="" className="w-20 md:w-32" />
          </div>
          <button onClick={() => setToggle(false)}>
            <RxCross2 className="text-xl md:text-4xl" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col h-full overflow-auto">
          {[
            "/",
            "/shop",
            "/about",
            "/contact",
            "/my/profile",
            "/my/orders",
            "/my/address",
          ].map((path, idx) => {
            const label = [
              "Home",
              "Shop",
              "About",
              "Contact",
              "Profile",
              "Orders",
              "Address",
            ][idx];
            return (
              <NavLink
                key={path}
                to={path}
                onClick={() => setToggle(false)}
                className="text-black md:text-3xl text-base border-b px-6 py-4 md:py-10 font-semibold"
              >
                {label}
              </NavLink>
            );
          })}
          {user ? (
            <NavLink
              to={"/"}
              onClick={() => 
                {setToggle(false)
                dispatch(UserLogout());
                dispatch(emptyCart());
                navigate("/");
                localStorage.setItem("logoutMessage", "Logged out successfully!");
                window.location.reload();
                }}
              className="text-black md:text-3xl text-base border-b px-6 py-4 md:py-10 font-semibold"
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              to={"/userlogin?ref=home"}
              onClick={() => setToggle(false)}
              className="text-black md:text-3xl text-base border-b px-6 py-4 md:py-10 font-semibold"
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
