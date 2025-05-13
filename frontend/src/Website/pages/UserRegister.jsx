import React, { useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserLogin } from "../../Redux/Reducer/UserSlice";
import { MainContext } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Register() {
  const { API_BASE_URL, toastNotify } = useContext(MainContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const userRegister = (event) => {

    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    axios
      .post(API_BASE_URL + "/user/create", data)
      .then((success) => {
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          dispatch(
            UserLogin({ data: success.data.user, token: success.data.token })
          );
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create a New Account
        </h2>

        <form className="space-y-4" onSubmit={userRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#967b2a]"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#967b2a]"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#967b2a]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#967b2a] hover:bg-[#7d6722] text-white font-semibold py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to={`/userlogin?${searchParams.toString()}`}>
            <span className="text-[#967b2a] hover:underline font-medium">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
