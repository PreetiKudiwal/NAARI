import React, { useContext, useEffect, useRef } from "react";
import { MainContext } from "../../../context/Context";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditSize() {
  const { fetchAllSize, allSize, API_BASE_URL, SIZE_URL, toastNotify } = 
    useContext(MainContext);
  console.log(allSize);
  const sizeLabel = useRef();
  const sizeSlug = useRef();
  const bust = useRef();
  const waist = useRef();
  const hip = useRef();
  const indiaSize = useRef();
  const intlSize = useRef();
  const { size_id } = useParams();
  const navigate = useNavigate();

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
  const indiaSizeOptions = [32, 34, 36, 38, 40, 42, 44];
  const intlSizeOptions = ["0-2", "4-6", "8-10", "12-14", "16-18", "20-22"];
  //create slug start

  const createSlug = (selectedOption) => {
    const label = selectedOption?.value || "";
    const slug = label
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    sizeSlug.current.value = slug;
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

  // handleSubmit start

  const editSize = (e) => {
    e.preventDefault();
    const sizeData = {
      sizeLabel: e.target.sizeLabel.value,
      sizeSlug: sizeSlug.current.value,
      waist: waist.current.value,
      bust: bust.current.value,
      hip: hip.current.value,
      indiaSize: e.target.indiaSize.value,
      intlSize: e.target.intlSize.value,
    };

    axios
      .put(API_BASE_URL + SIZE_URL + "/edit/" + size_id, sizeData)
      .then((success) => {
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          e.target.reset();
          navigate("/admin/size");
        }
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //get size by id

  useEffect(() => {
    fetchAllSize(size_id);
  }, []);

  // ✅ Don’t render form until data is ready
if (!allSize || !allSize.sizeLabel) return null;

// ✅ Define selected options AFTER data is ready
const selectedSizeLabel = { value: allSize.sizeLabel, label: allSize.sizeLabel };
const selectedIndiaSize = { value: allSize.indiaSize, label: allSize.indiaSize };
const selectedIntlSize = { value: allSize.intlSize, label: allSize.intlSize };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl text-white font-bold mb-4">Add Size</h2>

      <form
        onSubmit={editSize}
        className="p-8  rounded-lg space-y-8 text-white"
        style={{
          background:
            "linear-gradient(160deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
        }}
      >
        <div className="grid grid-cols-2 gap-8">
          {/* Size Label */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Size Label</label>
            <Select
              styles={customStyles}
              onChange={createSlug}
              name="sizeLabel"
              ref={sizeLabel}
              defaultValue={selectedSizeLabel}
              required
              options={
                Array.isArray(sizeOptions) &&
                sizeOptions?.map((size, index) => {
                  return { value: size, label: size };
                })
              }
            />
          </div>

          {/* Size Slug */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Size Slug</label>
            <input
              name="sizeSlug"
              type="text"
              className="w-full py-2 px-3 rounded-md bg-gray-800 focus:outline-none "
              placeholder="Generated slug"
              defaultValue={allSize.sizeSlug}
              readOnly
              required
              ref={sizeSlug}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Bust */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">
              Bust (inches)
            </label>
            <input
              type="number"
              name="bust"
              ref={bust}
              defaultValue={allSize.bust}
              required
              min={28}
              max={50}
              className="w-full p-3 bg-gray-600 rounded-lg"
              placeholder="e.g. 36"
            />
          </div>

          {/* Waist */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">
              Waist (inches)
            </label>
            <input
              type="number"
              name="waist"
              defaultValue={allSize.waist}
              ref={waist}
              required
              min={24}
              max={48}
              className="w-full p-3 bg-gray-600 rounded-lg"
              placeholder="e.g. 30"
            />
          </div>

          {/* Hip */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">
              Hip (inches)
            </label>
            <input
              type="number"
              defaultValue={allSize.hip}
              name="hip"
              ref={hip}
              required
              min={30}
              max={52}
              className="w-full p-3 bg-gray-600 rounded-lg"
              placeholder="e.g. 38"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {/* India Size */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">India Size</label>
            <Select
              styles={customStyles}
              defaultValue={selectedIndiaSize}
              name="indiaSize"
              required
              ref={indiaSize}
              options={
                Array.isArray(indiaSizeOptions) &&
                indiaSizeOptions?.map((size, index) => {
                  return { value: size, label: size };
                })
              }
            />
          </div>

          {/* Intl Size */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">
              International Size
            </label>
            <Select
              styles={customStyles}
              defaultValue={selectedIntlSize}
              name="intlSize"
              required
              ref={intlSize}
              options={
                Array.isArray(intlSizeOptions) &&
                intlSizeOptions?.map((size, index) => {
                  return { value: size, label: size };
                })
              }
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-md text-lg font-semibold bg-neutral-600 addButton"
        >
          Add Size
        </button>
      </form>
    </div>
  );
}
