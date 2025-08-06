import React, { useContext, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { MainContext } from "../../../context/Context";
import { useSelector } from "react-redux";
import { LuImagePlus } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

export default function AddCategory() {
  const { toastNotify, API_BASE_URL, CATEGORY_URL } = useContext(MainContext);
  const categoryName = useRef();
  const categorySlug = useRef();
  const token = useSelector((state) => state.admin.token);
  const [previewURL, setPreviewURL] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  const createSlug = () => {
    categorySlug.current.value = categoryName.current.value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewURL(imageUrl);
      setError(""); // Clear error if valid image selected
    }
  };

  const removeImage = () => {
    setPreviewURL(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  
  const addCategory = (event) => {
    event.preventDefault();

    // Validate image
    if (!fileInputRef.current?.files[0]) {
      setError("Please upload an image.");
      return;
    }

    setError(""); // Clear error if validation passes

    const formData = new FormData();

    formData.append("categoryName", categoryName.current.value);
    formData.append("categorySlug", categorySlug.current.value);
    formData.append(
      "categoryImageName",
      event.target.categoryImageName.files[0]
    );

    axios
      .post(API_BASE_URL + CATEGORY_URL + "/create", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((success) => {
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          event.target.reset();
          setPreviewURL(null);
        }
        console.log(success);
      })
      .catch((error) => {
        toastNotify("Something went wrong", 0);
        console.log(error);
      });
  };
  return (
    <div className="m-4">
      <h2 className="text-2xl text-white font-bold mb-4">Add Category</h2>
      <form
        onSubmit={addCategory}
        className="p-6 rounded-lg mx-16 text-white"
        style={{
          background:
            "linear-gradient(160deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
        }}
      >
        <div className="mb-4">
          <label className="block font-medium mb-2">Category Name</label>
          <input
            onChange={createSlug}
            ref={categoryName}
            type="text"
            placeholder="Enter category name"
            className="w-full px-4 py-2 rounded-lg text-white bg-gray-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Slug</label>
          <input
            readOnly
            ref={categorySlug}
            type="text"
            placeholder="Enter slug"
            className="w-full px-4 py-2 rounded-lg focus:outline-none text-white bg-gray-800"
            required
          />
        </div>
        {/* Image Upload */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Upload Image</label>

          <label className="flex gap-2 items-center justify-center w-full px-4 py-6 bg-transparent text-gray-600 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer">
            <div className="text-[30px]">
              <LuImagePlus />
            </div>
            <span>Click to upload or drag & drop</span>
            <input
              type="file"
              name="categoryImageName"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
          </label>

          {/* Image Error */}
          {error && (
            <p className="text-red-500 text-sm mt-1 font-medium">{error}</p>
          )}

          {/* Image Preview */}
          {previewURL && (
            <div className="mt-2 relative inline-block">
              <img
                src={previewURL}
                alt="Selected Preview"
                className="max-w-20 max-h-20 rounded border border-gray-500"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-[-4px] right-[-8px] bg-white border border-gray-500 text-black rounded-full"
                title="Remove image"
              >
                <IoClose size={16} />
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full font-semibold py-2 rounded-lg bg-neutral-600 addButton"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}
