import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainContext } from "../../../../context/Context";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../../../Redux/Reducer/UserSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactDOMServer from "react-dom/server";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function EditProfile() {
  const { API_BASE_URL, toastNotify } = useContext(MainContext);
  useState;
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  console.log(user);

  const editProfile = (event) => {
    event.preventDefault();

    const profileData = {
      _id: user._id,
      name: event.target.name.value,
      email: event.target.email.value,
      contact: event.target.contact.value,
    };

    axios
      .put(API_BASE_URL + "/user/edit", profileData)
      .then((success) => {
        console.log(success.data);
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          dispatch(
            UserLogin({
              data: success.data.user, // ✅ full updated user object
              token: user.token, // ✅ reuse the existing token
            })
          );
          event.target.reset();
          navigate("/my/profile");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changePassword = (user_id) => {
    MySwal.fire({
      title: <strong>Change Password</strong>,
      html: <PasswordPopUp user_id={user_id} API_BASE_URL={API_BASE_URL} />,
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  return (
    <div className="w-full mx-auto px-2 pb-6 md:p-6 bg-white border-t-0 md:border-t border lg:px-16">
      <h2 className="text-lg font-bold pb-3 border-b">Edit Profile</h2>

      <form className="space-y-4 black text-sm mt-4" onSubmit={editProfile}>
        <div className="grid grid-cols-2 justify-between gap-6 lg:gap-12">
          {/* Full Name */}
          <div className="col-span-2 lg:col-span-1">
            <label className="block font-medium">Full Name</label>
            <input
              defaultValue={user?.name}
              name="name"
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-black"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}

          <div className="col-span-2 lg:col-span-1">
            <label className="block font-medium">Email</label>
            <input
              defaultValue={user?.email}
              name="email"
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-black"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 justify-between gap-6 lg:gap-12">
          {/* Password */}
          <div className="col-span-2 lg:col-span-1">
            <label className="block font-medium">Password</label>
            <div className="relative">
              <input
                defaultValue={user?.password}
                name="password"
                type="password"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:border-black"
                placeholder="Enter new password"
              />
              <div
                className="border text-xs border-black absolute py-1 px-2 right-[10px] top-[15%] cursor-pointer rounded-md bg-black text-white"
                onClick={() => changePassword(user._id)}
              >
                Change
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <label className="block font-medium">Contact Number</label>
            <input
              defaultValue={user?.contact}
              name="contact"
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-black"
              placeholder="Enter contact number"
            />
          </div>
        </div>
        
        <button type="submit" className="w-full custom-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

function PasswordPopUp({ user_id, API_BASE_URL }) {
  const [errors, setErrors] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const MySwal = withReactContent(Swal);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const updatePassword = async (event) => {
    event.preventDefault();
    const password = event.target.password.value.trim();
    const newPassword = event.target.newPassword.value.trim();
    const confirmPassword = event.target.confirmPassword.value.trim();

    // Reset errors
    setErrors({ current: "", new: "", confirm: "" });

    let valid = true;
    const newErrors = {};

    if (!password) {
      newErrors.current = "Current password is required";
      valid = false;
    } else if (password.length < 7) {
      newErrors.current = "Must be at least 7 characters";
      valid = false;
    }

    if (!newPassword) {
      newErrors.new = "New password is required";
      valid = false;
    } else if (newPassword.length < 7) {
      newErrors.new = "Must be at least 7 characters";
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirm = "Please confirm new password";
      valid = false;
    } else if (confirmPassword !== newPassword) {
      newErrors.confirm = "Passwords do not match";
      valid = false;
    }

    if (!valid) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }
    try {
      const { data } = await axios.put(`${API_BASE_URL}/user/change-password`, {
        _id: user_id,
        password: password,
        newPassword: newPassword,
      });
      // console.log(data, 'data');
      if (data.status == 1) {
        MySwal.fire(
          "Success",
          data?.msg || "Password updated successfully",
          "success"
        );
        event.target.reset();
      } else {
        setErrors((prev) => ({
      ...prev,
      current: data?.msg || "Something went wrong",
    }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center border-t">
      <form
        className="space-y-4 mt-4 bg-white p-6 w-full max-w-md"
        onSubmit={updatePassword}
      >
        <div>
          <label className="mb-1 text-sm font-medium block">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPassword.current ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black pr-10"
              name="password"
              placeholder="Enter current password"
              minLength={7}
            />
            <span
              onClick={() => toggleVisibility("current")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
            >
              {showPassword.current ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.current && (
            <p className="text-red-500 text-sm">{errors.current}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword.new ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              name="newPassword"
              placeholder="Enter new password"
              minLength={7}
            />
            <span
              onClick={() => toggleVisibility("new")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
            >
              {showPassword.new ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.new && <p className="text-red-500 text-sm">{errors.new}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showPassword.confirm ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              name="confirmPassword"
              placeholder="Confirm new password"
              minLength={7}
            />
            <span
              onClick={() => toggleVisibility("confirm")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
            >
              {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirm && (
            <p className="text-red-500 text-sm">{errors.confirm}</p>
          )}
        </div>

        <button type="submit" className="custom-button">
          Update Password
        </button>
      </form>
    </div>
  );
}
