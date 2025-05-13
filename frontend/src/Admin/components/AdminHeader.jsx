import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsTextIndentRight, BsTextIndentLeft } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import { MainContext } from "../../context/Context";
import { FaCircleUser } from "react-icons/fa6";
import { logout } from "../../Redux/Reducer/AdminSlice";
import {
  FaMoon, FaSignInAlt, FaSun, FaCog, FaQuestionCircle, FaUserCog, FaUniversalAccess
} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const admin = useSelector((state) => state.admin.data);
  const { aSideBar, setASideBar } = useContext(MainContext);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null); // To reference the whole component

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const adminLogout = () => {
      dispatch(logout());
      navigate("/admin/login");
    };

  return (
    <div
      className=" text-white p-4 flex justify-between items-center shadow-md"
      style={{
        background: "linear-gradient(145deg, #1a1a1a 0%, #2e2e2e 100%)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="text-[25px] cursor-pointer"
          onClick={() => setASideBar(!aSideBar)}
        >
          {aSideBar === true ? <BsTextIndentRight /> : <BsTextIndentLeft />}
        </div>
        <div className="relative">
          <input
            type="text"
            className="bg-transparent text-white p-2 rounded-2xl focus:outline-none border border-white ps-12"
            placeholder="Search here..."
          />
          <div className="absolute text-[20px] transform translate-x-[10px] translate-y-[-150%]">
            <IoSearchSharp />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-7">
          <img src="/images/Bharat.png" alt="" />
        </div>
        <div className="flex items-center gap-1" >
          <div className="text-sm">Welcome! {admin?.name}</div>
          <div className="relative" ref={dropdownRef}>
          <div onClick={() => setIsOpen(!isOpen)} className=" text-[30px] bg-yellow-200 text-black border border-yellow-200 cursor-pointer rounded-full">
            <FaCircleUser />
          </div>

   {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute divide-y divide-zinc-500 right-0 mt-2 w-64 bg-black text-white rounded-lg shadow-md shadow-zinc-500 z-50 overflow-hidden">
          
          {/* Options */}
          <ul className="text-sm divide-y divide-zinc-500">
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 cursor-pointer">
              <FaUniversalAccess /> Accessibility
            </li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 cursor-pointer">
              <FaCog /> Preferences
            </li>
           
          </ul>

          {/* More Options */}
          <ul className="text-sm divide-y divide-zinc-500">
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 cursor-pointer">
              <FaUserCog /> Account Settings
            </li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 cursor-pointer">
              <FaQuestionCircle /> Help Center
            </li>
            <li onClick={adminLogout} className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 cursor-pointer text-red-600 font-medium">
              <FaSignInAlt /> Logout
            </li>
          </ul>
        </div>
      )}

          </div>
          
        </div>
      </div>
    </div>
  );
}
