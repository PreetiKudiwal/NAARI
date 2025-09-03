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
    <div className="min-h-screen bg-[url('/images/b2.jpg')]">
      <div className="bg-black/50 w-full min-h-screen flex justify-center p-6">
      <div className="w-full max-w-md bg-white px-8 color">
        <div className="flex justify-center">
          <img src="/images/logo.png" alt="logo" className="w-11 md:w-28"/>
        </div>
        <h2 className="text-4xl font-bold mb-6 text-center font">
          Create a New Account
        </h2>

        <form className="space-y-4" onSubmit={userRegister}>
          <div>
            <label className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-zinc-600"
              placeholder="Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-zinc-600"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-zinc-600"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="custom-button"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to={`/userlogin?${searchParams.toString()}`}>
            <span className="text-red-800 hover:underline font-medium">
              Login
            </span>
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}
