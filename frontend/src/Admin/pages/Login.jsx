import React, { useContext, useEffect } from 'react'
import { MainContext } from '../../context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../../Redux/Reducer/AdminSlice';

export default function Login() {

  const {API_BASE_URL, toastNotify} = useContext(MainContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.data);
  const lsData = JSON.parse(localStorage.getItem('adminLogin'));

  const loginAdmin = (event) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    axios.post(API_BASE_URL + '/admin/login', data).then(
      (success) => {
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          dispatch(login({data: success.data.admin, token: success.data.token}));
          navigate('/admin');
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  useEffect(
    () => {
      if(admin || lsData) {
        navigate('/admin');
      }
    }
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={loginAdmin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name='email'
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name='password'
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}
