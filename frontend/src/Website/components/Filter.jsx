import React, { useContext, useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { MainContext } from "../../context/Context";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function Filter({
  
  priceRange,
  setPriceRange,
  setFilterList,
  filterList,
  setSize,
  size,
    productColor,
    setProductColor,
}) {
  const {
    fetchAllCategory,
    fetchAllColor,
    fetchAllSize,
    allSize,
    allCategory,
    allColor,
  } = useContext(MainContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const {categorySlug} = useParams();
  
  useEffect(() => {
    fetchAllCategory();
    fetchAllColor();
    fetchAllSize();
  }, []);


  return (
    <div className="flex flex-col gap-2 border-e">

      {/* category section Start */}

      <div className="p-3 w-full flex flex-col border-b">
        <h1 className="text-md text-zinc-900 font-medium">CATEGORIES</h1>
        {!allCategory || allCategory.length === 0 ? (
          <div className="items-center text-sm cursor-pointer p-2 rounded space-y-4">
            {[1, 2, 3, 4, 5].map((num, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full h-5 rounded bg-gray-200 shimmer cursor-pointer"
                ></div>
              );
            })}
          </div>
        ) : (
          Array.isArray(allCategory) &&
          allCategory.map((category, index) => {
            return (
              <Link to={`/shop/${category.categorySlug}`} key={index}>
              <label
                className="flex gap-2 items-center text-sm cursor-pointer p-2 hover:bg-gray-100 rounded"
              >
                <input
                  type="checkbox"
                  name="category"
                  value={category.categorySlug}
                  className="accent-yellow-700"
                  checked={categorySlug === category.categorySlug}
                />
                <span>{category.categoryName}</span>
                <span className="lg:text-xs text-gray-500">
                  ({category.productCount})
                </span>
              </label>
              </Link>
            );
          })
        )}
      </div>

      {/* category section End */}

      {/* Price section Start */}

      <div className="p-3 w-full flex flex-col border-b">
        <h1 className="text-md text-zinc-900 font-medium mb-3">PRICE</h1>

        <ReactSlider
          className="w-full h-4 relative flex items-center"
          thumbClassName="h-3 w-3 bg-white rounded-full border-4 border-black cursor-pointer -mt-[0px]" // ⬅️ shift thumb up to center
          trackClassName="bg-yellow-700 h-1 top-1/2 transform -translate-y-1/2"
          min={100}
          max={100000}
          step={100}
          value={[Number(priceRange.from), Number(priceRange.to)]}
          onAfterChange={([from, to]) => {
            setPriceRange({ from, to });

            
            // const updatedParams = new URLSearchParams(searchParams);
            // updatedParams.set("priceFrom", from);
            // updatedParams.set("priceTo", to);
            // setSearchParams(updatedParams);
          }}
          // onAfterChange={([from, to]) => {
          //   const priceLabel = `₹${from} - ₹${to}`;
          //   setAppliedPrice((prev) =>
          //     prev.includes(priceLabel) ? prev : [...prev, priceLabel]
          //   );
          // }
        // }
          renderTrack={(props, state) => {
            const { key, ...restProps } = props; // extract key separately

            const baseClasses = "h-1 top-1/2 -translate-y-1/2 absolute";
            let bgColor = "bg-gray-300";

            if (state.index === 1) {
              bgColor = "bg-yellow-700";
            }

            return (
              <div
                key={key} //set key explicitly
                {...restProps} // spread rest of the props safely
                className={`${baseClasses} ${bgColor}`}
              />
            );
          }}
        />
          <div className="flex justify-between text-sm mt-2">
            <span>₹{priceRange.from}</span>
            <span>₹{priceRange.to}</span>
          </div>
      </div>

      <div className="p-3 w-full flex flex-col border-b">
        <h1 className="text-md text-zinc-900 font-medium">COLOR</h1>

        {!allColor || allColor.length === 0 ? (
          <div className="items-center text-sm cursor-pointer p-2 rounded space-y-4">
            {[1, 2, 3, 4, 5].map((num, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full h-5 rounded bg-gray-200 shimmer cursor-pointer"
                ></div>
              );
            })}
          </div>
        ) : (
          Array.isArray(allColor) &&
          allColor.map((color, index) => {
            return (
              <label
                key={index}
                className="flex gap-2 items-center text-sm cursor-pointer p-2 hover:bg-gray-100 rounded"
              >
                <input
                  type="checkbox"
                  name="color"
                  value={color._id}
                  className="accent-yellow-700"
                  checked={color._id === productColor}
                  onChange={() => {
                    setProductColor(color._id)
                  }}
                />
                <span className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 block border border-gray-700 rounded-full"
                    style={{ background: color.colorCode }}
                  ></span>
                  {color.colorName}
                </span>
              </label>
            );
          })
        )}
      </div>

      <div className="p-3 w-full flex flex-col border-b">
        <h1 className="text-md text-zinc-900 font-medium">SIZE</h1>

        {!allSize || allSize.length === 0 ? (
          <div className="items-center text-sm cursor-pointer p-2 rounded space-y-4">
            {[1, 2, 3, 4, 5].map((num, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full h-5 rounded bg-gray-200 shimmer cursor-pointer"
                ></div>
              );
            })}
          </div>
        ) : (
          Array.isArray(allSize) &&
          allSize.map((s, index) => {
            return (
              <label
                key={index}
                className="flex gap-2 items-center text-sm cursor-pointer p-2 hover:bg-gray-100 rounded"
              >
                <input
                  type="checkbox"
                  name="size"
                  value={s.sizeSlug}
                  className="accent-yellow-700"
                  checked={s.sizeSlug === size}
                  onChange={() => setSize(s.sizeSlug)}
                />
                <span className="flex items-center gap-2">{s.sizeLabel}</span>
              </label>
            );
          })
        )}
      </div>
    </div>
  );
}
