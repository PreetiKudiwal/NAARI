import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Reducer/AdminSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const { API_BASE_URL, toastNotify } = useContext(MainContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.data);
  const lsData = JSON.parse(localStorage.getItem("adminLogin"));
  const [showPassword, setShowPassword] = useState(false);

  const loginAdmin = (event) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    axios
      .post(API_BASE_URL + "/admin/login", data)
      .then((success) => {
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          dispatch(
            login({ data: success.data.admin, token: success.data.token })
          );
          navigate("/admin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
  if (admin || lsData) {
    navigate("/admin", { replace: true });
  }
}, [admin, lsData, navigate]);

  return (
    <div className="min-h-screen flex justify-end background">
      <div
        className="w-full max-w-2xl shadow-lg p-8 rounded space-y-6 opacity-90 flex justify-center"
        style={{
          background:
            "linear-gradient(-145deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
        }}
      >
        <div
          className="w-full max-w-md h-full shadow-lg p-8 rounded-xl space-y-10 shadow-zinc-600 text-white"
          style={{
            background:
              "linear-gradient(145deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
          }}
        >
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-white">
            Login to Your Account
          </h2>

          {/* Form */}
          <form className="space-y-10" onSubmit={loginAdmin}>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-xl bg-zinc-500 placeholder:text-zinc-900 text-black"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-xl bg-zinc-500 placeholder:text-zinc-900 text-black pr-10"
              />
              <span
                className="absolute right-3 top-9 text-zinc-800 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full font-medium py-2 rounded-xl bg-zinc-800 addButton text-black"
            >
              Login
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
