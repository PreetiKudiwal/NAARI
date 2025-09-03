import React, { useContext, useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { MainContext } from "../../context/Context";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function Filter({
  setAppliedCategory,
  setAppliedColor,
  setAppliedSize,
  setAppliedPrice,
  priceRange,
  setPriceRange,
  setFilterList,
  appliedColor,
  appliedCategory,
  appliedPrice,
  appliedSize,
  setSize,
  size,
}) {
  const {
    fetchAllCategory,
    fetchAllColor,
    fetchAllSize,
    allSize,
    allCategory,
    allColor,
    filterByColor,
    productColor,
    setProductColor,
  } = useContext(MainContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    // const slug = e.target.value;
    // console.log("Selected category slug:", slug);
    // if (selectedCategorySlug === slug) {
    //   setSelectedCategorySlug(null);
    //   navigate("/shop");
    // } else {
    //   setSelectedCategorySlug(slug);
    //   navigate(`/shop/${slug}`);
    // }
  };

  const handleSizeChange = (sizeLabel) => {
    if (appliedSize.includes(sizeLabel)) {
      // Unselect if already selected
      setAppliedSize((prev) => prev.filter((item) => item !== sizeLabel));
    } else {
      setAppliedSize((prev) =>
        prev.includes(sizeLabel) ? prev : [...prev, sizeLabel]
      );
    }
  };

  // Color handler
  const handleColorChange = (colorId) => {
    // const newColorId = productColor === colorId ? null : colorId;
    // setProductColor(newColorId);
    // // Update URL searchParams
    // const updatedParams = new URLSearchParams(searchParams);
    // if (newColorId) {
    //   updatedParams.set("productColor", newColorId);
    // } else {
    //   updatedParams.delete("productColor");
    // }
    // setSearchParams(updatedParams);
    // // Apply filter
    // setProductColor(newColorId);
  };

  useEffect(() => {
    const priceFrom = searchParams.get("priceFrom");
    const priceTo = searchParams.get("priceTo");

    if (priceFrom && priceTo) {
      setPriceRange({ from: Number(priceFrom), to: Number(priceTo) });
    }
  }, []);

  useEffect(() => {
    if (appliedCategory.length > 0 && allCategory.length > 0) {
      const lastCategoryName = appliedCategory[appliedCategory.length - 1];

      // Find slug from category name
      const matchedCategory = allCategory.find(
        (cat) => cat.categoryName === lastCategoryName
      );

      if (matchedCategory) {
        const slug = matchedCategory.categorySlug;
        navigate(`/shop/${slug}`);
      }
    } else if (appliedCategory.length === 0) {
      navigate("/shop");
    }
  }, [appliedCategory, allCategory]);

  useEffect(() => {
    if (appliedColor.length > 0 && allColor.length > 0) {
      const lastColorName = appliedColor[appliedColor.length - 1];
      const matchedColor = allColor.find(
        (clr) => clr.colorName === lastColorName
      );

      if (matchedColor) {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.set("productColor", matchedColor._id);
        setSearchParams(updatedParams);
        // setSelectedColorId(matchedColor._id);
        setProductColor(matchedColor._id);
      }
    } else {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.delete("productColor");
      setSearchParams(updatedParams);
      // setSelectedColorId(null);
      setProductColor(null);
    }
  }, [appliedColor, allColor]);

  useEffect(() => {
    if (
      Array.isArray(appliedSize) &&
      appliedSize.length > 0 &&
      allSize.length > 0
    ) {
      const lastSize = appliedSize[appliedSize.length - 1];
      const matchedSize = allSize.find((size) => size.sizeLabel === lastSize);

      if (matchedSize) {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.set("size", matchedSize.sizeSlug);
        setSearchParams(updatedParams);
        setSize(matchedSize.sizeSlug);
      }
    } else {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.delete("size");
      setSearchParams(updatedParams);
      setSize(null);
    }
  }, [appliedSize, allSize]);

  useEffect(() => {
    fetchAllCategory();
    fetchAllColor();
    fetchAllSize();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchAllCategory();
    fetchAllColor();
    fetchAllSize();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="flex flex-col gap-2 border-e">
      {/* category section Start */}

      <div className="p-3 w-full flex flex-col border-b">
        <h1 className="text-md text-zinc-900 font-medium">CATEGORIES</h1>

        {Array.isArray(allCategory) &&
          allCategory.map((category, index) => {
            return loading ? (
              <div
                key={index}
                className="items-center text-sm cursor-pointer p-2 rounded"
              >
                {/* Skeleton for categories */}
                <div className="w-full h-5 rounded bg-gray-200 shimmer cursor-pointer"></div>
              </div>
            ) : (
              <label
                key={index}
                className="flex gap-2 items-center text-sm cursor-pointer p-2 hover:bg-gray-100 rounded"
              >
                <input
                  type="checkbox"
                  name="category"
                  value={category.categorySlug}
                  className="accent-yellow-700"
                  onChange={(e) => {
                    handleCategoryChange(e);

                    if (e.target.checked) {
                      setAppliedCategory((prev) =>
                        prev.includes(category.categoryName)
                          ? prev
                          : [...prev, category.categoryName]
                      );
                    } else {
                      setAppliedCategory((prev) =>
                        prev.filter((item) => item !== category.categoryName)
                      );
                    }
                  }}
                  checked={
                    // selectedCategorySlug === category.categorySlug ||
                    appliedCategory.includes(category.categoryName)
                  }
                />
                <span>{category.categoryName}</span>
                <span className="lg:text-xs text-gray-500">
                  ({category.productCount})
                </span>
              </label>
            );
          })}
      </div>

      {/* category section End */}

      {/* Price section Start */}

      <div className="p-3 w-full flex flex-col border-b">
        <h1 className="text-md text-zinc-900 font-medium mb-3">PRICE</h1>

        <ReactSlider
          className="w-full h-4 relative flex items-center" // h-4 for room to center thumbs
          thumbClassName="h-3 w-3 bg-white rounded-full border-4 border-black cursor-pointer -mt-[0px]" // ⬅️ shift thumb up to center
          trackClassName="bg-yellow-700 h-1 top-1/2 transform -translate-y-1/2"
          min={100}
          max={100000}
          step={100}
          value={[Number(priceRange.from), Number(priceRange.to)]}
          onChange={([from, to]) => {
            setPriceRange({ from, to });

            // Update URL searchParams
            const updatedParams = new URLSearchParams(searchParams);
            updatedParams.set("priceFrom", from);
            updatedParams.set("priceTo", to);
            setSearchParams(updatedParams);
          }}
          onAfterChange={([from, to]) => {
            const priceLabel = `₹${from} - ₹${to}`;
            setAppliedPrice((prev) =>
              prev.includes(priceLabel) ? prev : [...prev, priceLabel]
            );
          }}
          renderTrack={(props, state) => {
            const { key, ...restProps } = props; // extract key separately

            const baseClasses = "h-1 top-1/2 -translate-y-1/2 absolute";
            let bgColor = "bg-gray-300";

            if (state.index === 1) {
              bgColor = "bg-yellow-700";
            }

            return loading ? (
              <div
                key={key}
                {...restProps}
                className={`${baseClasses} ${bgColor} rounded`}
              >
                <div className="w-full h-full bg-gray-200 rounded shimmer"></div>
              </div>
            ) : (
              <div
                key={key} // ⬅️ set key explicitly
                {...restProps} // ⬅️ spread rest of the props safely
                className={`${baseClasses} ${bgColor}`}
              />
            );
          }}
        />
        {loading ? (
          <div className="flex justify-between text-sm mt-2">
            <span className="h-4 w-10 bg-gray-200 rounded shimmer"></span>
            <span className="h-4 w-10 bg-gray-200 rounded shimmer"></span>
          </div>
        ) : (
          <div className="flex justify-between text-sm mt-2">
            <span>₹{priceRange.from}</span>
            <span>₹{priceRange.to}</span>
          </div>
        )}
      </div>

      <div className="p-3 w-full flex flex-col border-b">
        <h1 className="text-md text-zinc-900 font-medium">COLOR</h1>

        {Array.isArray(allColor) &&
          allColor.map((color, index) => {
            return loading ? (
              <div
                key={index}
                className="flex gap-2 items-center text-sm cursor-pointer p-2 rounded"
              >
                {/* Skeleton for colors */}
                <div className="w-full h-5 rounded bg-gray-200 shimmer cursor-pointer"></div>
              </div>
            ) : (
              <label
                key={index}
                className="flex gap-2 items-center text-sm cursor-pointer p-2 hover:bg-gray-100 rounded"
              >
                <input
                  type="checkbox"
                  name="color"
                  value={color._id}
                  className="accent-yellow-700"
                  checked={appliedColor.includes(color.colorName)}
                  onChange={(e) => {
                    handleColorChange(color._id);

                    if (e.target.checked) {
                      setAppliedColor((prev) =>
                        prev.includes(color.colorName)
                          ? prev
                          : [...prev, color.colorName]
                      );
                    } else {
                      setAppliedColor((prev) =>
                        prev.filter((item) => item !== color.colorName)
                      );
                    }
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
          })}
      </div>

      <div className="p-3 w-full flex flex-col border-b">
        <h1 className="text-md text-zinc-900 font-medium">SIZE</h1>

        {Array.isArray(allSize) &&
          allSize.map((s, index) => {
            return loading ? (
              <div
                key={index}
                className="flex gap-2 items-center text-sm cursor-pointer p-2 rounded"
              >
                {/* Skeleton for sizes */}
                <div className="w-full h-5 rounded bg-gray-200 shimmer cursor-pointer"></div>
              </div>
            ) : (
              <label
                key={index}
                className="flex gap-2 items-center text-sm cursor-pointer p-2 hover:bg-gray-100 rounded"
              >
                <input
                  type="checkbox"
                  name="size"
                  value={s.sizeSlug}
                  className="accent-yellow-700"
                  checked={
                    Array.isArray(appliedSize) &&
                    appliedSize.includes(s.sizeLabel)
                  }
                  onChange={() => handleSizeChange(s.sizeLabel)}
                />
                <span className="flex items-center gap-2">{s.sizeLabel}</span>
              </label>
            );
          })}
      </div>
    </div>
  );
}
