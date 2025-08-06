import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MainContext } from "../../../../../context/Context";
import axios from "axios";
import { UserLogin } from "../../../../../Redux/Reducer/UserSlice";

export default function ViewAddress() {
  const {API_BASE_URL, toastNotify} = useContext(MainContext);
  const user = useSelector((state) => state.user.data);
  const allAddress = user?.shipping_address;

  const dispatch = useDispatch();

  const removeAddress = (addressToRemove) => {
    console.log(addressToRemove);

    const data = {
      _id: user._id,
      index: addressToRemove
    }
    axios.put(`${API_BASE_URL}/user/remove-address`,data).then(
      (success) => {
        console.log(success.data);
        toastNotify(success.data.msg, success.data.status);
        if(success.data.status == 1) {
          dispatch(UserLogin({
            data: success.data.user,
            token: user.token
          }))
        }
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  return (
    <div className="w-full mx-auto px-2 lg:px-20 pb-6 md:py-6 border-t-0 md:border-t border">
      <div className="flex justify-between items-center border-b px-4 pb-2 mb-4">
        <h2 className="text-lg font-bold">Saved Addresses</h2>
        <Link to={"/my/address/add"}>
          <button className="max-w-fit px-2 py-0 custom-button">
            + Add New Address
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {Array.isArray(allAddress) &&
          allAddress.map((address, index) => {
            return (
              <div
                key={index}
                className="color text-sm hover:shadow-md p-4 bg-white flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-sm mb-2">{address.name}</div>
                  <div>{address.addressLine1}</div>
                  <div>{address.addressLine2}</div>
                  <div>
                    {address.city} - {address.postalCode}
                  </div>
                  <div>{address.state}</div>
                  <div>{address.country}</div>
                  <div className="mt-2">Mobile: {address.contact}</div>
                </div>
                <button className="border border-zinc-800 text-xs px-3 lg:text-sm py-1 hover:bg-zinc-800 hover:text-white hover:rounded-md transition duration-300"
                onClick={() => removeAddress(index)}>
                  Remove
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
