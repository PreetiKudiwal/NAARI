import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../../../context/Context";
import axios from "axios";
import { LuImagePlus } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

export default function MultipleImage() {

  const {
    PRODUCT_URL,
    API_BASE_URL,
    toastNotify,
    allProduct,
    fetchAllproduct,
  } = useContext(MainContext);
  const navigate = useNavigate();
  const { product_id } = useParams();
    const fileInputRef = useRef();

    const [selectedImages, setSelectedImages] = useState([]);

    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setSelectedImages((prev) => [...prev, ...previews]);
    };

    const removeSelectedImage = (index) => {
      const updated = [...selectedImages];
      URL.revokeObjectURL(updated[index].preview); // Free memory
      updated.splice(index, 1);
      setSelectedImages(updated);
    };
  
  const uploadOtherImages = (event) => {
    event.preventDefault();

    const formData = new FormData();
    selectedImages.forEach((imgObj) => {
      formData.append("other_img", imgObj.file);
    });

    axios
      .post(
        API_BASE_URL + PRODUCT_URL + "/multipleimage/" + product_id,
        formData
      )
      .then((success) => {
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          event.target.reset();
          navigate("/admin/products")
        }
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllproduct(product_id);
  }, []);
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl text-white font-bold mb-4">Upload Images</h2>
      <form
        onSubmit={uploadOtherImages}
        className="p-8 rounded-lg text-white"
        style={{
          background:
            "linear-gradient(160deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
        }}
      >
          <div className="mb-4">
            <label className="block font-medium mb-2">Other Images</label>

            <label className="flex gap-2 items-center justify-center w-full px-4 py-6 bg-transparent text-gray-600 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer">
              <div className="text-[30px]">
                <LuImagePlus />
              </div>
              <span>Click to upload or drag & drop</span>
              <input
              multiple
                type="file"
                name="OtherImages"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
              onChange={handleFileChange}
              />
            </label>


          </div>

          {/* Preview Selected Images */}
        {selectedImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedImages.map((img, index) => (
              <div key={index} className="relative inline-block">
                <img
                  src={img.preview}
                  alt="Preview"
                  className="w-14 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeSelectedImage(index)}
                  className="absolute top-[-6px] right-[-6px] bg-white text-black rounded-full border border-gray-400"
                >
                  <IoClose size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-3 mt-5">
          <div className="flex gap-1 col-span-2">
            {Array.isArray(allProduct.other_img)
            && 
            allProduct.other_img.map((image, index) => {
              return (
                <img
                  key={index}
                  src={`${image}`}
                  alt="Other Images"
                  className="w-14 rounded-md"
                />
              );
            })}
          </div>

          <div>
            <button className="w-full mt-6 col-span-1 py-3 bg-neutral-600 rounded-md text-lg font-semibold addButton">
              Upload Images
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
