import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Context";
import { Link } from "react-router-dom";

export default function Filter() {
  const { fetchAllCategory, fetchAllColor, allCategory, allColor, filterByColor } =
    useContext(MainContext);

  useEffect(() => {
    fetchAllCategory();
    fetchAllColor();
  }, []);

  return (
    <div className="p-3 bg-gray-100 flex flex-col gap-2">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-xl font-medium">Filter by Category</h1>
        {Array.isArray(allCategory) &&
          allCategory.map((category, index) => {
            return (
              <Link key={index} to={`/shop/${category.categorySlug}`}>
              <div
                
                className="shadow-lg w-full h-8 text-center relative group bg-white rounded-md"
              >
                <div className="text-[14px] w-full h-full flex justify-between items-center ps-2 pe-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span>{category.categoryName}</span>
                  <span>({category.productCount})</span>
                </div>
                {/* Child with group-hover scale */}
                <div className="bg-[#e7cb77] p-2 h-full text-[14px] rounded-e-md text-center flex justify-between items-center border-s-4 text-[#6d5a20] border-[#967b2a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 cursor-pointer w-full origin-left absolute">
                  <span>{category.categoryName}</span>
                  <span>({category.productCount})</span>
                </div>
              </div>
              </Link>
            );
          })}
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1 className="text-xl font-medium">Filter by Color</h1>
        {Array.isArray(allColor) &&
          allColor.map((color, index) => {
            return (
              <div
                onClick={() => filterByColor(color._id)}
                key={index}
                className="shadow-lg w-full h-8 text-start relative bg-white group rounded-md"
              >
                <div className="text-[14px] w-full h-full flex justify-between items-center absolute left-1/2 top-1/2 ps-2 pe-2 -translate-x-1/2 -translate-y-1/2">
                  <span>{color.colorName}</span>
                  <span
                    className="w-4 h-4 block rounded-full"
                    style={{ background: color.colorCode }}
                  ></span>
                </div>
                {/* Child with group-hover scale */}
                <div className="bg-[#e7cb77] p-2 h-full text-[14px] rounded-e-md text-start flex justify-between items-center border-s-4 text-[#6d5a20] border-[#967b2a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 cursor-pointer w-full origin-left absolute">
                  <span>{color.colorName}</span>
                  <span
                    className="w-4 h-4 block rounded-full"
                    style={{ background: color.colorCode }}
                  ></span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
