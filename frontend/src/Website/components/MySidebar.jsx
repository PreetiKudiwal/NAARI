import React, { useContext } from "react";
import { MdLocationPin } from "react-icons/md";
import { LuBoxes } from "react-icons/lu";
import { IoMdHeart } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserLogout } from "../../Redux/Reducer/UserSlice";
import { emptyCart } from "../../Redux/Reducer/CartSlice";

export default function MySidebar() {

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const navMenu = [
    {
      path: "/my/profile",
      name: "Profile",
      icon: <FaUser />,
    },
    {
      path: "/my/address",
      name: "Address",
      icon: <MdLocationPin />,
    },
    {
      path: "/my/orders",
      name: "Orders",
      icon: <LuBoxes />,
    },
    {
      path: "/wishlist",
      name: "Wishlist",
      icon: <IoMdHeart />,
    },
  ];

  return (
    <div className="flex flex-col sticky top-52">
      <div className="space-y-4 border-b pb-4">
        {navMenu.map((navItem, navIndex) => {
          return (
            <NavLink
              key={navIndex}
              end={navItem.path === "/my"} // 👈 only apply 'end' to Dashboard
              to={navItem.path}
              className={({ isActive }) =>
                `flex items-center gap-1 rounded-lg cursor-pointer hover:font-bold hover:text-zinc-900`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`p-2 rounded-md ${
                      isActive ? "text-zinc-900" : "color"
                    }`}
                  >
                    {navItem.icon}
                  </span>
                  <span
                    className={`text-sm text-zinc-900 ${
                      isActive ? "font-bold" : ""
                    }`}
                  >
                    {navItem.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
      <div
        className="flex gap-1 items-center ps-3 py-4 text-sm hover:font-bold cursor-pointer"
        onClick={() => {
          dispatch(UserLogout());
          dispatch(emptyCart());
          navigate("/");
        }}
      >
        <TbLogout />
        Logout
      </div>
    </div>
  );
}
