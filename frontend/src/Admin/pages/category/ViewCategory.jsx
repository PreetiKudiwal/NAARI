import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../../context/Context";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

export default function ViewCategory() {
  const {
    fetchAllCategory,
    allCategory,
    API_BASE_URL,
    CATEGORY_URL,
    toastNotify,
  } = useContext(MainContext);
  const token = useSelector((state) => state.admin.token);

  const deleteCategory = (id) => {
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
          .delete(API_BASE_URL + CATEGORY_URL + "/delete/" + id)
          .then((success) => {
            toastNotify(success.data.msg, success.data.status);
            if (success.data.status == 1) {
              fetchAllCategory();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const statusChange = (id) => {
    axios
      .patch(API_BASE_URL + CATEGORY_URL + `/status/${id}`)
      .then((success) => {
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          fetchAllCategory();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token) {
      fetchAllCategory();
    }
  }, [token]);
  return (
    <div className="m-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold my-4 text-white">Category List</h2>
        <Link to={"/admin/category/add"}>
          <button className="font-medium px-4 py-2 rounded-lg bg-zinc-800 addButton">
            Add Category
          </button>
        </Link>
      </div>
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
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Slug</th>
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(allCategory) &&
            allCategory?.map((categoryData, categoryIndex) => {
              return (
                <tr
                  key={categoryIndex}
                  className="border-t text-white hover:bg-zinc-800 text-center"
                >
                  <td className="py-2 px-4">{categoryIndex + 1}.</td>
                  <td className="py-2 px-4">{categoryData.categoryName}</td>
                  <td className="py-2 px-4">{categoryData.categorySlug}</td>
                  <td className="py-2 px-4">
                    <img
                      src={
                        `${categoryData.categoryImageName}`
                      }
                      alt="Sample"
                      className="w-12 h-12 rounded"
                    />
                  </td>
                  <td className="py-2 px-4">
                    {categoryData.categoryStatus == true ? (
                      <button
                        onClick={() => statusChange(categoryData._id)}
                        className="border text-white gap-1 px-3 py-1 rounded-2xl flex items-center justify-between mx-auto"
                      >
                        <div className="bg-green-600 rounded-lg">
                          <FaRegCircleCheck />
                        </div>
                        <span>Active</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => statusChange(categoryData._id)}
                        className="border text-white gap-1 px-3 py-1 rounded-2xl flex items-center justify-between mx-auto"
                      >
                        <div className="bg-red-600 border-2 text-[12px] rounded-lg">
                          <RxCross2 />
                        </div>
                        <span>Inactive</span>
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-4 flex items-center justify-center gap-5">
                    <Link to={`/admin/category/edit/${categoryData._id}`}>
                      <button className="border text-white px-3 py-1 rounded-xl">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteCategory(categoryData._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
