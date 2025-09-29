import React, { useContext, useEffect, useState } from "react";
import Filter from "../components/Filter";
import Products from "../components/Products";
import { MainContext } from "../../context/Context";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { BiSort } from "react-icons/bi";

export default function Shop() {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams, 'searchParams');
      const location = useLocation();
      console.log(location, "location");

    const initSize = searchParams.get("size") !== "null"
    ? searchParams.get("size")
    : null;

const initColor = searchParams.get("productColor") !== "null"
    ? searchParams.get("productColor")
    : null;

   const initPriceFrom = searchParams.get("priceFrom") && searchParams.get("priceFrom") !== "null"
  ? Number(searchParams.get("priceFrom"))
  : 100;

const initPriceTo = searchParams.get("priceTo") && searchParams.get("priceTo") !== "null"
  ? Number(searchParams.get("priceTo"))
  : 100000;

const [size, setSize] = useState(initSize);
const [productColor, setProductColor] = useState(initColor);
  const [limit, setLimit] = useState(0);

  const [priceRange, setPriceRange] = useState({ from: initPriceFrom, to: initPriceTo });
  console.log(priceRange.from, priceRange.to, "priceRange");
  
  const { categorySlug } = useParams();
  const [showFilter, setShowFilter] = useState(false);
  const [showLimit, setShowLimit] = useState(false);
  const [filterList, setFilterList] = useState([]);
  const navigate = useNavigate();

  return (
    <div>
      <div className="hidden lg:block color text-sm [word-spacing:15px] p-4">
        <Link to={"/"}>
          <span className="hover:text-yellow-700 cursor-pointer me-3">
            Home
          </span>
        </Link>
        &gt; Shop
      </div>

      <div className="relative min-h-screen">
        {/* Limit Selector - large screens */}

        <div className="grid grid-cols-6 lg:border-b lg:border-t items-center">
          <div className="hidden col-span-2 md:block lg:col-span-1">
            <div className="w-full flex justify-between items-center p-4 font-semibold">
              <span>FILTERS</span>
              <span
                className={`text-xs text-yellow-700 cursor-pointer ${
                  location.pathname === '/shop' && location.search === '' ? "hidden" : "block"
                }`}
                onClick={() => {
                  navigate('/shop');
                  setProductColor(null);
                  setSize(null);
                  setPriceRange({ from: 100, to: 100000 });
                  setLimit(0);
                }}
              >
                CLEAR ALL
              </span>
            </div>
          </div>
          {/* <div className="hidden md:block md:col-span-3 lg:col-span-4 px-4 py-3">
           
            {filterList.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                {filterList.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-100 text-zinc-500 px-3 py-1 rounded-full text-xs"
                  >
                    <span>{item}</span>
                    <button
                      onClick={() => handleRemoveFilter(item)}
                      className="text-zinc-500 hover:text-zinc-700 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div> */}
          <div className="hidden md:block md:col-span-1 lg:col-span-5 md:pe-4 lg:px-4 py-3">
            <div className="flex justify-end">
              <div className="border color text-sm bg-slate-100">
                <span className="px-2">Show</span>
                <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="px-1 py-1 border-s focus:outline-none cursor-pointer bg-slate-100"
                >
                  <option value="0">ALL</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-6 md:border-b">
          <div className="hidden col-span-2 md:block lg:col-span-1">
            <div className="sticky top-0 lg:-top-[430px]">
            <Filter
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              size={size}
              setSize={setSize}
              setFilterList={setFilterList}
              filterList={filterList}
              productColor={productColor}
              setProductColor={setProductColor}
            />
            </div>
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-5">
            <Products
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              size={size}
              setSize={setSize}
              categorySlug={categorySlug}
              limit={limit}
              setLimit={setLimit}
              productColor={productColor}
              setProductColor={setProductColor}
            />
          </div>
        </div>

        {/* Sticky Bottom Buttons (visible on md and smaller) */}
        <div className="md:hidden fixed bottom-0 w-full bg-white shadow-md flex z-20 border-t-2 border-[#444343]">
          <button
            onClick={() => setShowFilter(true)}
            className="w-1/2 color px-6 py-4 border-e-2 flex justify-center items-center  border-[#444343]"
          >
            <HiAdjustmentsHorizontal className="text-lg" />
            Filter
          </button>

          <button
            onClick={() => setShowLimit(true)}
            className="w-1/2 color px-6 py-4  flex justify-center items-center"
          >
            <BiSort className="text-lg" />
            Show
          </button>
        </div>

        {/* Overlay: Filter */}
        <div
          className={`md:hidden fixed inset-0 z-30 bg-white transition-transform duration-300 flex flex-col ${
            showFilter == true ? "translate-y-12" : "translate-y-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b shadow-md ">
            <h2 className="text-lg font-semibold">Filter</h2>
            <FaTimes
              className="text-xl cursor-pointer"
              onClick={() => setShowFilter(false)}
            />
          </div>
          <div className="grid grid-cols-2 px-4 flex-1 overflow-hidden">
            <div className="col-span-1 pb-11 overflow-y-auto">
              <Filter
                
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setSize={setSize}
                size={size}
                setFilterList={setFilterList}
                filterList={filterList}
              productColor={productColor}
              setProductColor={setProductColor}
              />
            </div>

            <div className="col-span-1 p-4 space-y-2 pb-14 overflow-y-auto">
              {/* <span
                className={`text-xs text-yellow-700 cursor-pointer ${
                  filterList.length === 0 ? "hidden" : "block"
                }`}
                onClick={() => {
                  setFilterList([]);
                  setAppliedCategory([]);
                  setAppliedColor([]);
                  setAppliedPrice([]);
                  setAppliedSize([]);
                  setPriceRange({ from: 100, to: 100000 });
                  setProductColor(null);
                }}
              >
                CLEAR ALL
              </span> */}
              {/* <div>
                {filterList.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                    {filterList.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-gray-100 text-zinc-500 px-3 py-1 rounded-full text-xs"
                      >
                        <span>{item}</span>
                        <button
                          onClick={() => handleRemoveFilter(item)}
                          className="text-zinc-500 hover:text-zinc-700 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </div>

        {/* Overlay: Show/Limit Selector */}
        <div
          className={`md:hidden fixed inset-0 z-30 bg-white transition-transform duration-300 ${
            showLimit ? "translate-y-12" : "translate-y-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b shadow-md">
            <h2 className="text-lg font-semibold">Select Limit</h2>
            <FaTimes
              className="text-xl cursor-pointer"
              onClick={() => setShowLimit(false)}
            />
          </div>
          <div className="p-4">
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full border px-4 py-3 rounded-md text-lg"
            >
              <option value="0">ALL</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
