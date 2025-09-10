import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../../context/Context";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import axios from "axios";

export default function ViewSize() {
  const { fetchAllSize, allSize, API_BASE_URL, SIZE_URL, toastNotify } =
    useContext(MainContext);

  //Status chage

  const statusChange = (id) => {
    axios
      .patch(API_BASE_URL + SIZE_URL + `/status/${id}`)
      .then((success) => {
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          fetchAllSize();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Delete size start

  const deleteColor = (id) => {
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
          .delete(API_BASE_URL + SIZE_URL + "/delete/" + id)
          .then((success) => {
            toastNotify(success.data.msg, success.data.status);
            if (success.data.status == 1) {
              fetchAllSize();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  //fetchAllSize function is called
  useEffect(() => {
    fetchAllSize();
  }, []);


  return (
    <div className="m-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold my-4 text-white">Size List</h2>
        <button className="font-medium px-4 py-2 rounded-lg bg-zinc-800 addButton">
          <Link to={"/admin/size/add"}>Add Size</Link>
        </button>
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
            <th className="py-2 px-4">Size Label</th>
            <th className="py-2 px-4">Size Slug</th>
            <th className="py-2 px-4">Bust</th>
            <th className="py-2 px-4">Waist</th>
            <th className="py-2 px-4">Hip</th>
            <th className="py-2 px-4">India Size</th>
            <th className="py-2 px-4">Intl Size</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(allSize) &&
            allSize.map((sizeData, sizeIndex) => {
              return (
                <tr
                  key={sizeIndex}
                  className="border-t text-white hover:bg-zinc-800 text-center"
                >
                  <td className="py-2 px-4">{sizeIndex + 1}.</td>
                  <td className="py-2 px-4">{sizeData.sizeLabel}</td>
                  <td className="py-2 px-4">{sizeData.sizeSlug}</td>
                  <td className="py-2 px-4">{sizeData.bust}</td>
                  <td className="py-2 px-4">{sizeData.waist}</td>
                  <td className="py-2 px-4">{sizeData.hip}</td>
                  <td className="py-2 px-4">{sizeData.indiaSize}</td>
                  <td className="py-2 px-4">{sizeData.intlSize}</td>
                  <td className="p-2">
                    {sizeData.status == true ? (
                      <button
                        onClick={() => statusChange(sizeData._id)}
                        className="border text-white gap-1 px-3 py-1 rounded-2xl flex items-center justify-between mx-auto"
                      >
                        <div className="bg-green-600 rounded-lg">
                          <FaRegCircleCheck />
                        </div>
                        <span>Active</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => statusChange(sizeData._id)}
                        className="border text-white gap-1 px-3 py-1 rounded-2xl flex items-center justify-between mx-auto"
                      >
                        <div className="bg-red-600 border-2 text-[12px] rounded-lg">
                          <RxCross2 />
                        </div>
                        <span>Inactive</span>
                      </button>
                    )}
                  </td>
                  <td className="p-2 flex gap-4 justify-center">
                    <Link to={`/admin/size/edit/${sizeData._id}`}>
                      <button className="border text-white px-3 py-1 rounded-xl">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteColor(sizeData._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
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
