import React, { useContext, useEffect } from "react";
import { MainContext } from "../../../context/Context";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function ViewUser() {
  const {
    fetchAllUser,
    allUser,
    API_BASE_URL,
    toastNotify,
  } = useContext(MainContext);

  console.log(allUser);

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#1e1e1e",
      customClass: {
        title: "swal-title",
        htmlContainer: "swal-text",
        icon: "custom-icon",
        confirmButton: "custom-confirm-btn",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(API_BASE_URL + "/user" + "/delete/" + id)
          .then((success) => {
            toastNotify(success.data.msg, success.data.status);
            if (success.data.status == 1) {
              fetchAllUser();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-8 text-white">User Management</h1>
      <div className="overflow-x-auto">
        <table
          className="w-full rounded-lg overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
          }}
        >
          <thead>
            <tr className="bg-zinc-800 text-center">
              <th className="py-2 px-4">S.No</th>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Contact</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(allUser) &&
              allUser?.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-t text-center text-white hover:bg-zinc-800"
                >
                  <td className="py-2 px-4">{index + 1}.</td>
                  <td className="py-2 px-4">{user._id}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.contact == null && '--not added--'}</td>
                  <td className="p-2 flex justify-center">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
