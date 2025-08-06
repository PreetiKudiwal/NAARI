import React, { useContext } from "react";
import { MainContext } from "../../../../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../../../../Redux/Reducer/UserSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddAddress() {
  const { API_BASE_URL, toastNotify } = useContext(MainContext);
  const user = useSelector((state) => state.user.data);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addAddress = (event) => {
    event.preventDefault();

    const name = event.target.name.value.trim();
    const contact = event.target.contact.value.trim();
    const addressLine1 = event.target.addressLine1.value.trim();
    const addressLine2 = event.target.addressLine2.value.trim();
    const city = event.target.city.value.trim();
    const state = event.target.state.value.trim();
    const country = event.target.country.value.trim();
    const postalCode = event.target.postalCode.value.trim();

    const addressData = {
      _id: user?._id,
      name,
      contact,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
    };
    axios
      .put(API_BASE_URL + "/user/add-address", addressData)
      .then((success) => {
        console.log(success);
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          dispatch(
            UserLogin({
              data: success.data.user,
              token: user.token,
            })
          );
          event.target.reset();
          navigate("/my/address");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full mx-auto px-2 pb-6 md:p-6 bg-white border-t-0 md:border-t border lg:px-20">
      <h2 className="text-lg font-bold pb-3 border-b">Add Address</h2>

      <form className="space-y-4 mt-4" onSubmit={addAddress}>
        <div className="grid grid-cols-2 justify-between gap-4">
          <div className="col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              name="name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium mb-1">
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              placeholder="Enter your contact number"
              pattern="[6-9]{1}[0-9]{9}"
              title="Please enter a valid 10-digit Indian mobile number"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Address Line 1
          </label>
          <input
            type="text"
            name="addressLine1"
            placeholder="House no., Street, etc."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Address Line 2{" "}
            <span className="text-gray-400 text-sm">(Optional)</span>
          </label>
          <input
            type="text"
            name="addressLine2"
            placeholder="Apartment, Landmark, etc."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              name="state"
              placeholder="State"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium mb-1">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              placeholder="PIN Code"
              pattern="^[1-9][0-9]{5}$"
              title="Please enter a valid 6-digit Indian PIN code"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>
        </div>

        <button type="submit" className="custom-button">
          Save Address
        </button>
      </form>
    </div>
  );
}
