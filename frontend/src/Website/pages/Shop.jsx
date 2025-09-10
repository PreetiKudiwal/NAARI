import React, { useContext, useEffect, useState } from "react";
import Filter from "../components/Filter";
import Products from "../components/Products";
import { MainContext } from "../../context/Context";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { BiSort } from "react-icons/bi";

export default function Shop() {
  const { fetchAllproduct, productColor, setProductColor } =
    useContext(MainContext);
  const [limit, setLimit] = useState(0);
  const [size, setSize] = useState(null);
  const [filterList, setFilterList] = useState([]);
  const [appliedCategory, setAppliedCategory] = useState([]);
  const [appliedColor, setAppliedColor] = useState([]);
  const [appliedPrice, setAppliedPrice] = useState([]);
  const [appliedSize, setAppliedSize] = useState([]);
  const [priceRange, setPriceRange] = useState({ from: 100, to: 100000 });
  const [searchParams, setSearchParams] = useSearchParams();
  const { categorySlug } = useParams();
  const [showFilter, setShowFilter] = useState(false);
  const [showLimit, setShowLimit] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const navigate = useNavigate();


function handleRemoveFilter(filter) {
  setFilterList((prev) => prev.filter((item) => item !== filter));

  const updatedSearchParams = new URLSearchParams(searchParams.toString());

  setAppliedCategory((prev) => {
    const updated = prev.filter((item) => item !== filter);
    if (prev.includes(filter)) {
      setShouldNavigate(true); //  flag navigation instead
    }
    return updated;
  });

  setAppliedColor((prev) => {
    const updated = prev.filter((item) => item !== filter);
    if (prev.includes(filter)) {
      setProductColor(null);
      updatedSearchParams.delete("productColor");
    }
    return updated;
  });

    // Remove from appliedPrice
    setAppliedPrice((prev) => {
      const updated = prev.filter((item) => item !== filter);

      if (prev.includes(filter)) {
        if (updated.length > 0) {
          const last = updated[updated.length - 1];

          // Extract numbers from format like "₹500 - ₹1000"
          const match = last.match(/₹?(\d+)\s*-\s*₹?(\d+)/);
          if (match) {
            const from = parseInt(match[1]);
            const to = parseInt(match[2]);

            setPriceRange({ from, to });
            updatedSearchParams.set("priceFrom", from);
            updatedSearchParams.set("priceTo", to);
          }
        } else {
          // No prices left
          setPriceRange({ from: 100, to: 100000 });
          updatedSearchParams.delete("priceFrom");
          updatedSearchParams.delete("priceTo");
        }
      }

      return updated;
    });


    //Remove from appliedSize
    setAppliedSize((prev) => {
      const updated = prev.filter((item) => item !== filter);
      if (prev.includes(filter)) {
      setSize(null);
      updatedSearchParams.delete("size");
    }
    return updated;
  });

    // Remove limit only if no filters left
    if (filterList.length === 1) {
      updatedSearchParams.delete("limit");
    }

    // Apply updated URL
    setSearchParams(updatedSearchParams);
  }

  useEffect(() => {
    const storedCategories = JSON.parse(
      localStorage.getItem("appliedCategory")
    );
    if (storedCategories && Array.isArray(storedCategories)) {
      setAppliedCategory(storedCategories);
    }

    const storedColors = JSON.parse(localStorage.getItem("appliedColor"));
    if (storedColors && Array.isArray(storedColors)) {
      setAppliedColor(storedColors);
    }

    const storedPrices = JSON.parse(localStorage.getItem("appliedPrice"));
    if (storedPrices && Array.isArray(storedPrices)) {
      setAppliedPrice(storedPrices);
    }

    const storedSizes = JSON.parse(localStorage.getItem("appliedSize"));

    if (storedSizes && Array.isArray(storedSizes)) {
      setAppliedSize(storedSizes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appliedCategory", JSON.stringify(appliedCategory));
  }, [appliedCategory]);

  useEffect(() => {
    localStorage.setItem("appliedColor", JSON.stringify(appliedColor));
  }, [appliedColor]);

  useEffect(() => {
    localStorage.setItem("appliedPrice", JSON.stringify(appliedPrice));
  }, [appliedPrice]);

  useEffect(() => {
    localStorage.setItem("appliedSize", JSON.stringify(appliedSize));
  }, [appliedSize]);
  useEffect(() => {
    const merged = [
      ...appliedCategory,
      ...appliedColor,
      ...appliedPrice,
      ...appliedSize,
    ];
    setFilterList(merged);
  }, [appliedCategory, appliedColor, appliedPrice, appliedSize]);

  useEffect(() => {
    if (searchParams.get("limit")) {
      setLimit(searchParams.get("limit"));
    }
  }, []);

  useEffect(() => {
    const query = {};

    if (limit !== 0) {
      query.limit = limit;
    }

    if (productColor) {
      query.productColor = productColor;
    }

    if (size) {
      query.size = size;
    }

    if (priceRange.from !== 100 || priceRange.to !== 100000) {
      query.priceFrom = priceRange.from;
      query.priceTo = priceRange.to;
    }

    if (filterList.length > 0) {
      fetchAllproduct(
        null,
        limit,
        categorySlug,
        productColor,
        size,
        priceRange?.from,
        priceRange?.to
      );
    } else {
      fetchAllproduct(null, limit);
    }

    setSearchParams(query);
  }, [limit, categorySlug, productColor, size, priceRange, filterList]);

  useEffect(() => {
  if (shouldNavigate) {
    navigate("/shop");
    setShouldNavigate(false);
  }
}, [shouldNavigate, navigate]);

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
                  filterList.length === 0 ? "hidden" : "block"
                }`}
                onClick={() => {
                  setFilterList([]);
                  setAppliedCategory([]);
                  setAppliedColor([]);
                  setAppliedPrice([]);
                  setAppliedSize([]);
                  setPriceRange({ from: 100, to: 100000 });
                  // Clear query params from URL
                  setSearchParams({});
                  setProductColor(null);
                  setShouldNavigate(true);
                }}
              >
                CLEAR ALL
              </span>
            </div>
          </div>
          <div className="hidden md:block md:col-span-3 lg:col-span-4 px-4 py-3">
            {/* Applied Filter Badges */}
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
          </div>
          <div className="hidden md:block md:col-span-1 lg:col-span-1 md:pe-4 lg:px-4 py-3">
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
              appliedCategory={appliedCategory}
              setAppliedCategory={setAppliedCategory}
              appliedColor={appliedColor}
              setAppliedColor={setAppliedColor}
              appliedPrice={appliedPrice}
              setAppliedPrice={setAppliedPrice}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setFilterList={setFilterList}
              size={size}
              setSize={setSize}
              appliedSize={appliedSize}
              setAppliedSize={setAppliedSize}
            />
            </div>
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-5">
            <Products
              priceRange={priceRange}
              size={size}
              categorySlug={categorySlug}
              limit={limit}
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
                appliedCategory={appliedCategory}
                setAppliedCategory={setAppliedCategory}
                appliedColor={appliedColor}
                setAppliedColor={setAppliedColor}
                appliedPrice={appliedPrice}
                setAppliedPrice={setAppliedPrice}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setFilterList={setFilterList}
                setSize={setSize}
                size={size}
                appliedSize={appliedSize}
                setAppliedSize={setAppliedSize}
              />
            </div>

            <div className="col-span-1 p-4 space-y-2 pb-14 overflow-y-auto">
              <span
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
                  // Clear query params from URL
                  setSearchParams({});
                  setProductColor(null);
                }}
              >
                CLEAR ALL
              </span>
              <div>
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
              </div>
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
