import axios from "axios";
import React, { useContext, useRef } from "react";
import { useState } from "react";
import Select from "react-select";
import { MainContext } from "../../../context/Context";

export default function AddSize() {
  const { API_BASE_URL, SIZE_URL, toastNotify } = useContext(MainContext);

  const sizeLabel = useRef();
  const sizeSlug = useRef();
  const bust = useRef();
  const waist = useRef();
  const hip = useRef();
  const indiaSize = useRef();
  const intlSize = useRef();

  const [selectedSizeLabel, setSelectedSizeLabel] = useState("");
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "OneSize"];
  const indiaSizeOptions = [32, 34, 36, 38, 40, 42, 44];
  const intlSizeOptions = ["0-2", "4-6", "8-10", "12-14", "16-18", "20-22"];

  //create slug start

  const createSlug = (selectedOption) => {
    const label = selectedOption?.value || "";
    setSelectedSizeLabel(label);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const sizeData = {
      sizeLabel: e.target.sizeLabel.value,
      sizeSlug: sizeSlug.current.value,
      bust: selectedSizeLabel !== "OneSize" ? bust.current.value : undefined,
      waist: selectedSizeLabel !== "OneSize" ? waist.current.value : undefined,
      hip: selectedSizeLabel !== "OneSize" ? hip.current.value : undefined,
      indiaSize:
        selectedSizeLabel !== "OneSize" ? e.target.indiaSize.value : undefined,
      intlSize:
        selectedSizeLabel !== "OneSize" ? e.target.intlSize.value : undefined,
    };

    axios
      .post(API_BASE_URL + SIZE_URL + "/create", sizeData)
      .then((success) => {
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          e.target.reset();
        }
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl text-white font-bold mb-4">Add Size</h2>

      <form
        onSubmit={handleSubmit}
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
              required={selectedSizeLabel !== "OneSize"}
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
              ref={waist}
              required={selectedSizeLabel !== "OneSize"}
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
              name="hip"
              ref={hip}
              required={selectedSizeLabel !== "OneSize"}
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
              name="indiaSize"
              required={selectedSizeLabel !== "OneSize"}
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
              name="intlSize"
              required={selectedSizeLabel !== "OneSize"}
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
