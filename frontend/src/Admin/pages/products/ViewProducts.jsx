import React, { useContext, useEffect } from "react";
import { MainContext } from "../../../context/Context";
import { ImCross } from "react-icons/im";
import { FaCheck, FaRegStar, FaEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { IoMdImages } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";

export default function ViewProducts() {
  const {
    API_BASE_URL,
    PRODUCT_URL,
    toastNotify,
    fetchAllproduct,
    allProduct,
  } = useContext(MainContext);

  const deleteProduct = (id) => {
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
          .delete(API_BASE_URL + PRODUCT_URL + "/delete/" + id)
          .then((success) => {
            toastNotify(success.data.msg, success.data.status);
            if (success.data.status == 1) {
              fetchAllproduct();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const changePersentValue = (id, flag) => {
    axios
      .patch(API_BASE_URL + PRODUCT_URL + `/change/${id}`, { flag })
      .then((success) => {
        toastNotify(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          fetchAllproduct();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewProduct = (productData) => {
    const productDetails = ReactDOMServer.renderToString(
      <ProductPopUp productData={productData} API_BASE_URL={API_BASE_URL} />
    );
    Swal.fire({
      title: "<strong>Product Details</strong>",
      html: productDetails,
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        popup: "product-pop-up",
      },
    });
  };

  useEffect(() => {
    fetchAllproduct();
  }, []);

  return (
    <div className="m-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold my-4 text-white">Products</h2>
        <button className="font-medium px-4 py-2 rounded-lg bg-zinc-800 addButton">
          <Link to={"/admin/products/add"}>Add Product</Link>
        </button>
      </div>
      <table
        className="min-w-full rounded-lg overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
        }}
      >
        <thead>
          <tr className="bg-zinc-800 text-black uppercase text-sm leading-normal text-center">
            <th className="py-2 px-4">S.No</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Color</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Stock</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {Array.isArray(allProduct) &&
            allProduct?.map((productData, productIndex) => {
              return (
                <tr
                  key={productIndex}
                  className="border-t hover:bg-zinc-800 text-center"
                >
                  <td className="py-2 px-4">{productIndex + 1}.</td>
                  <td className="py-2 px-4 w-fit">{productData.name}</td>
                  <td className="py-2 px-4 ">
                    <span>${productData?.finel_price?.toFixed(1)}</span>
                    <span className="line-through ms-2">
                      ${productData.original_price}
                    </span>
                    <span className="text-green-700 ms-2">
                      ({productData.discount_percentage}% off)
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {productData.colors.map((colorData, colorIndex) => {
                      return (
                        <span key={colorIndex}>{colorData.colorName}, </span>
                      );
                    })}
                  </td>
                  <td className="py-2 px-4">
                    {productData?.category_id?.categoryName}
                  </td>
                  <td className="py-2 px-4">
                    <img
                      src={
                        API_BASE_URL + `/images/product/${productData.main_img}`
                      }
                      alt="Product"
                      className="w-12 h-12 rounded"
                    />
                  </td>
                  <td className="py-2 px-4">
                    {productData.stock == true ? (
                      <button
                        onClick={() => changePersentValue(productData._id, 1)}
                        className="border text-white px-3 py-1 rounded-lg"
                      >
                        In
                      </button>
                    ) : (
                      <button
                        onClick={() => changePersentValue(productData._id, 1)}
                        className="border text-white px-3 py-1 rounded-lg"
                      >
                        Out
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-4 flex gap-1 items-center justify-center">
                    {productData.status == true ? (
                      <button
                        onClick={() => changePersentValue(productData._id, 2)}
                        className="border text-white px-3 py-2 rounded-lg"
                      >
                        <FaCheck />
                      </button>
                    ) : (
                      <button
                        onClick={() => changePersentValue(productData._id, 2)}
                        className="border text-white px-3 py-2 rounded-lg"
                      >
                        <ImCross />
                      </button>
                    )}

                    <button
                      onClick={() => changePersentValue(productData._id, 3)}
                      className="border text-white px-3 py-2 rounded-lg"
                    >
                      {productData.top_selling == true ? (
                        <FaStar />
                      ) : (
                        <FaRegStar />
                      )}
                    </button>

                    <Link to={`/admin/products/edit/${productData._id}`}>
                      <button className="border text-white px-3 py-2 rounded-lg">
                        <BiEdit />
                      </button>
                    </Link>

                    <Link
                      to={`/admin/products/multipleimage/${productData._id}`}
                    >
                      <button className="border text-white px-3 py-2 rounded-lg">
                        <IoMdImages />
                      </button>
                    </Link>

                    <button
                      onClick={() => viewProduct(productData)}
                      className="border text-white px-3 py-2 rounded-lg"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => deleteProduct(productData._id)}
                      className="border text-white px-3 py-2 rounded-lg"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}

          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
}

function ProductPopUp({ productData, API_BASE_URL }) {
  return (
    <div className="flex flex-col md:flex-row mt-1 rounded">
      {/* Left Side: Images */}
      <div className="w-1/2 flex flex-col rounded p-3 gap-4 ms-24 ">
        {/* Main Image */}
        <div>
          <img
            src={API_BASE_URL + `/images/product/${productData.main_img}`}
            alt="Main Product"
            className="w-80 h-[360px] cover rounded mx-auto"
          />
        </div>

        {/* Other Images */}
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {productData.other_img.map((image, index) => {
            return (
              <img
                key={index}
                src={API_BASE_URL + `/images/product/${image}`}
                alt="Other 1"
                className="w-16 rounded"
              />
            );
          })}
        </div>
      </div>

      {/* Right Side: Display Values Only */}
      <div className="w-1/2 flex flex-col gap-2 pe-12">
        <div className="flex items-center gap-2">
          <label className="font-medium text-neutral-400">Id:</label>
          <p>{productData._id}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <label className="font-medium text-neutral-400">Name:</label>
            <p>{productData.name}</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-medium text-neutral-400">Slug:</label>
            <p>{productData.slug}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <label className="font-medium text-neutral-400">Category:</label>
            <p>{productData?.category_id?.categoryName}</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-medium text-neutral-400">Color:</label>
            <p>
              {productData?.colors?.map((color, index) => {
                return <span key={index}>{color.colorName}, </span>;
              })}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <label className="font-medium text-neutral-400">
              Original Price:
            </label>
            <p>${productData.original_price}</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-medium text-neutral-400">Discount:</label>
            <p>{productData.discount_percentage}%</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-medium text-neutral-400">Final Price:</label>
            <p>${productData.finel_price.toFixed(1)}</p>
          </div>
        </div>

        <div className="space-y-1 text-left">
          <label className="font-medium text-neutral-400">
            Short Description:
          </label>
          <p className="w-full border border-neutral-400 rounded-md px-2 h-[75px] overflow-auto">
            {productData.short_description}
          </p>
        </div>

        <div className="space-y-1 text-left">
          <label className="font-medium text-neutral-400 text-left">
            Long Description:
          </label>
          <p className="w-full border border-neutral-400 px-2 rounded-md h-40 overflow-auto">
            {productData.long_description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <label className="font-medium text-neutral-400">Status:</label>
            <p>{productData.status == true ? "Active" : "Inactive"}</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-medium text-neutral-400">Stock:</label>
            <p>{productData.stock == true ? "In stock" : "Out of stock"}</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-medium text-neutral-400">Top Selling:</label>
            <p>{productData.top_selling == true ? "Yes" : "No"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium text-neutral-400">Created at:</label>
          <p>{productData.createdAt}</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium text-neutral-400">Updated at:</label>
          <p>{productData.updatedAt}</p>
        </div>
      </div>
    </div>
  );
}
