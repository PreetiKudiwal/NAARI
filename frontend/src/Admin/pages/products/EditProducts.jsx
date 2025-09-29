import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../../../context/Context";
import Select from "react-select";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LuImagePlus } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

export default function EditProducts() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const { product_id } = useParams();
  const productName = useRef();
  const productSlug = useRef();
  const originalPrice = useRef();
  const discountPercentage = useRef();
  const finalPrice = useRef();
  const fileInputRef = useRef();
  const [previewURL, setPreviewURL] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(selectedSizes, 'selectedSizes');
  console.log(selectedColors, 'selectedColors');

  const {
    allColor,
    fetchAllColor,
    fetchAllCategory,
    fetchAllproduct,
    fetchAllSize,
    allSize,
    allProduct,
    allCategory,
    PRODUCT_URL,
    API_BASE_URL,
    toastNotify,
  } = useContext(MainContext);

  const createSlug = () => {
    productSlug.current.value = productName.current.value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const calculateFinelPrice = () => {
    finalPrice.current.value =
      originalPrice.current.value -
      (originalPrice.current.value * discountPercentage.current.value) / 100;
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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#4B5563", // gray-600
      border: "none",
      boxShadow: "none",
      "&:hover": {
        border: "none",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white", // Make selected single value white
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#6B7280", // tag background (gray-500)
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white", // Make multi-select value text white
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#D1D5DB", // Tailwind gray-300 (optional)
    }),
    input: (provided) => ({
      ...provided,
      color: "white", // Ensure typed text is white
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#4B5563", // Dropdown background
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#1F2937" // Tailwind gray-800 (selected)
        : state.isFocused
        ? "#374151" // Tailwind gray-700 (hovered)
        : "#4B5563", // Tailwind gray-600 (default)
      color: "white",
    }),
  };

  const editProduct = (event) => {
    event.preventDefault();
    setError(""); // Clear error if validation passes

    const formData = new FormData();

    formData.append("name", productName.current.value);
    formData.append("slug", productSlug.current.value);
    formData.append("original_price", originalPrice.current.value);
    formData.append("discount_percentage", discountPercentage.current.value);
    formData.append("finel_price", finalPrice.current.value);
    formData.append("short_description", event.target.shortDescription.value);
    formData.append("long_description", event.target.longDescription.value);
    formData.append("category_id", selectedCategory?.value);
    formData.append(
      "colors",
      JSON.stringify(selectedColors.map((color) => color.value))
    );
    formData.append("sizes", JSON.stringify(selectedSizes))
    if (fileInputRef.current?.files[0]) {
      formData.append("main_img", fileInputRef.current.files[0]);
    }

    axios
      .put(API_BASE_URL + PRODUCT_URL + "/edit/" + product_id, formData)
      .then((success) => {
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          event.target.reset();
          setPreviewURL(null);
          navigate("/admin/products");
        }
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllCategory();
    fetchAllColor();
    fetchAllSize();
    fetchAllproduct(product_id);
  }, []);

  return (
    <>
      <div className="container mx-auto p-8">
        <h2 className="text-2xl text-white font-bold mb-4">Edit Products</h2>
        <form
          onSubmit={editProduct}
          className=" bg-white p-8 rounded-lg flex flex-col gap-8 text-white"
          style={{
            background:
              "linear-gradient(160deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
          }}
        >
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block font-medium mb-2">Product Name</label>
              <input
                defaultValue={allProduct.name}
                ref={productName}
                onChange={createSlug}
                name="productName"
                type="text"
                className="w-full p-3 bg-gray-600 rounded-lg focus:outline-none"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Slug</label>
              <input
                defaultValue={allProduct.slug}
                ref={productSlug}
                name="slug"
                type="text"
                className="w-full p-3 rounded-md bg-gray-800 focus:outline-none "
                placeholder="Generated slug"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block font-medium mb-2">Original Price</label>
              <input
                defaultValue={allProduct.original_price}
                onChange={calculateFinelPrice}
                ref={originalPrice}
                name="originalPrice"
                type="number"
                className="w-full p-3 bg-gray-600 rounded-lg focus:outline-none"
                placeholder="Enter original price"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Discount Percentage
              </label>
              <input
                defaultValue={allProduct.discount_percentage}
                onChange={calculateFinelPrice}
                ref={discountPercentage}
                name="discountPercentage"
                type="number"
                className="w-full p-3 bg-gray-600 rounded-lg focus:outline-none"
                placeholder="Enter discount %"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Final Price</label>
              <input
                defaultValue={allProduct.finel_price}
                ref={finalPrice}
                name="finalPrice"
                type="number"
                className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none"
                placeholder="Final price after discount"
                readOnly
              />
            </div>

            <div>
            <label className="block font-medium mb-2">Size</label>
            

            <Select styles={customStyles}
            onChange={
              (options) => {
                const allSizeId = options.map(
                  (data, index) => {
                    return data.value;
                  }
                )
                setSelectedSizes(allSizeId);
              }
            }
            closeMenuOnSelect={false}
            isMulti
            options={
              Array.isArray(allSize)
              &&
              allSize?.map(
                (size, index) => {
                  return(
                    { value: size._id, label: size.sizeLabel }
                  )
                }
              )
            } />
          </div>
          </div>

          <div>
              <label className="block font-medium mb-2">
                Short Description
              </label>
              <textarea
                defaultValue={allProduct.short_description}
                name="shortDescription"
                className="w-full h-12 p-3 bg-gray-600 rounded-lg focus:outline-none resize-none"
                placeholder="Enter short description"
              ></textarea>
            </div>

          <div>
            <label className="block font-medium mb-2">Long Description</label>
            <textarea
              defaultValue={allProduct.long_description}
              name="longDescription"
              className="w-full h-36 p-3 bg-gray-600 rounded-lg focus:outline-none resize-none"
              placeholder="Enter long description"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Upload Image</label>

            <label className="flex gap-2 items-center justify-center w-full px-4 py-6 bg-transparent text-gray-600 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer">
              <div className="text-[30px]">
                <LuImagePlus />
              </div>
              <span>Click to upload or drag & drop</span>
              <input
                type="file"
                name="mainImage"
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
            {!previewURL ? (
              <img
                src={`${allProduct.main_img}`}
                alt="Current Product"
                className="max-w-20 rounded border border-gray-500 mt-2"
              />
            ) : (
              <div className="mt-2 relative inline-block">
                <img
                  src={previewURL}
                  alt="Selected Preview"
                  className="max-w-20 rounded border border-gray-500"
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

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block font-medium mb-2">Category</label>
              <Select
                styles={customStyles}
                name="category_id"
                value={selectedCategory}
                onChange={(selectedOption) =>
                  setSelectedCategory(selectedOption)
                }
                options={allCategory?.map((category) => ({
                  value: category?._id,
                  label: category?.categoryName,
                }))}
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Color</label>
              <Select
                styles={customStyles}
                closeMenuOnSelect={false}
                isMulti
                name="colors"
                value={selectedColors}
                onChange={(options) => setSelectedColors(options)}
                options={allColor?.map((color) => ({
                  value: color?._id,
                  label: color?.colorName,
                }))}
              />
            </div>
          </div>
          <div>
            <button className="w-full py-3 rounded-md bg-neutral-600 text-lg font-semibold addButton">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
