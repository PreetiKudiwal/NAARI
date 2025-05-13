import React, { useContext, useEffect } from "react";
import {
  FaThList,
  FaPalette,
  FaBox,
  FaSignOutAlt,
  FaHome,
  FaUser
} from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { data, NavLink, useNavigate } from "react-router-dom";
import { login, logout } from "../../Redux/Reducer/AdminSlice";
import { MainContext } from "../../context/Context";

export default function AdminSidebar() {

  const {aSideBar} = useContext(MainContext)

  const navMenu = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: "/admin/category",
      name: "Category",
      icon: <FaThList />,
    },
    {
      path: "/admin/color",
      name: "Color",
      icon: <FaPalette />,
    },
    {
      path: "/admin/products",
      name: "Products",
      icon: <FaBox />,
    },
    {
      path: "/admin/user",
      name: "Users",
      icon: <FaUser />,
    },
    {
      path: "/admin/setting",
      name: "Setting",
      icon: <IoSettingsSharp />,
    }
  ];

  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.data);
  const lsData = JSON.parse(localStorage.getItem("adminLogin"));
  const lsToken = localStorage.getItem("adminToken");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!admin && !lsData) {
      navigate("/admin/login");
    } else {
      dispatch(login({ data: lsData, token: lsToken }));
    }
  }, []);

  const adminLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };
  return (
    <div className="h-screen w-[228px] text-white flex flex-col p-5"
    style={{
      background: "linear-gradient(145deg, #1a1a1a 0%, #2e2e2e 5%, #000000 100%)"
    }}>
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <div className="flex flex-col h-full">
      <nav className="flex flex-col gap-4 h-[89%] border-b-2 border-zinc-700">
        {navMenu.map((navItem, navIndex) => {
          return (
            <NavLink
              key={navIndex}
              end={navItem.path === "/admin"} // 👈 only apply 'end' to Dashboard
              to={navItem.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`bg-gray-700 p-2 rounded-md ${isActive ? "text-gray-700 bg-yellow-200" : "text-yellow-200"}`}>
                    {navItem.icon}
                  </span>
                  <span className={`text-white ${aSideBar === false ? 'hidden' : ''}`}>{navItem.name}</span>
                </>
              )}
            </NavLink>
          );
        })}

        
      </nav>
      <div
          onClick={adminLogout}
          className="flex items-center gap-3 p-2 rounded-lg bg-red-600 mt-auto cursor-pointer"
        >
          <FaSignOutAlt /> Logout
        </div>
        </div>
    </div>
  );
}
