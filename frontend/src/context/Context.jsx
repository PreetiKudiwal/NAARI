import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export const MainContext = createContext();

export default function Context({ children }) {
  const [aSideBar, setASideBar] = useState(true);
  const [allCategory, setAllCategory] = useState([]);
  const [allColor, setAllColor] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  const [allAdminUser, setAllAdminUser] = useState([]);
  const [productColor, setProductColor] = useState(null);
  const [allOrder, setAllOrder] = useState([]);
  const [allSize, setAllSize] = useState([]);
  const token = useSelector((state) => state.admin.token);

  const API_BASE_URL = "http://localhost:5001";
  const CATEGORY_URL = "/category";
  const COLOR_URL = "/color";
  const PRODUCT_URL = "/product";
  const ADMIN_USER_URL = "/admin";
  const ORDER_URL = "/order";
  const SIZE_URL = "/size";

  const toastNotify = (msg, status) =>
    toast(msg, { type: status == true ? "success" : "error" });

  //fetch allcategory start

  const fetchAllCategory = (category_id = null) => {
    let categoryApiUrl = API_BASE_URL + CATEGORY_URL;

    if (category_id) {
      categoryApiUrl += `/${category_id}`;
    }
    axios
      .get(categoryApiUrl, {
        headers: {
          Authorization: token,
        },
      })
      .then((success) => {
        setAllCategory(success.data.category);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fetch allcategory end

  //fetch allcolor start

  const fetchAllColor = (color_id = null) => {
    let colorApiUrl = API_BASE_URL + COLOR_URL;

    if (color_id) {
      colorApiUrl += `/${color_id}`;
    }

    axios
      .get(colorApiUrl)
      .then((success) => {
        setAllColor(success.data.color);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fetch allcolor end

  //fetch allproduct start

  const fetchAllproduct = (
    product_id = null,
    limit = 0,
    categorySlug = null,
    productColor = null,
    size = null,
    priceFrom = null,
    priceTo = null
  ) => {
    let productApiUrl = API_BASE_URL + PRODUCT_URL ;

    if (product_id) {
      productApiUrl += `/${product_id}`;
    }

    const query = new URLSearchParams();
    if (limit) query.append("limit", limit);
    query.append("categorySlug", categorySlug);
    query.append("productColor", productColor);
    query.append("size", size);
    if (priceFrom !== null) query.append("priceFrom", priceFrom);
    if (priceTo !== null) query.append("priceTo", priceTo);

    axios
      .get(productApiUrl + "?" + query)
      .then((success) => {
        setAllProduct(success.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fetch allproduct end

  //fetch single product start

  const fetchSingleProduct = (product_id) => {
     console.log(product_id, "productidinfetch");
    axios.get(API_BASE_URL + PRODUCT_URL + "/id" + `/${product_id}`).then(
      (success) => {
        setSingleProduct(success.data.single_product);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  } 

  //fetch single product end

  //fetch allAdminUser start

  const fetchAllAdminUser = (admin_id = null) => {
    let adminApiUrl = API_BASE_URL + ADMIN_USER_URL;

    if (admin_id) {
      adminApiUrl += `/${admin_id}`;
    }

    axios
      .get(adminApiUrl)
      .then((success) => {
        setAllAdminUser(success.data.admin);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fetch allAdminUser end

  //filter by color start

  const filterByColor = (id) => {
    setProductColor(id);
  };

  //filter by color end

  //fetch all order start

  const fetchAllOrder = (user_id = null) => {

    let orderApiUrl = API_BASE_URL + ORDER_URL;

    if(user_id) {
      orderApiUrl += `/${user_id}`;
    }

    axios.get(orderApiUrl).then(
      (success) => {
        console.log(success);
        setAllOrder(success.data.order);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  //fetch all order end

  //fetch all size start

  const fetchAllSize = (size_id = null) => {
    let sizeApiUrl = API_BASE_URL + SIZE_URL;

    if (size_id) {
      sizeApiUrl += `/${size_id}`;
    }

    axios.get(sizeApiUrl).then(
      (success) => {
        setAllSize(success.data.size);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  //fetch all size end

  return (
    <MainContext.Provider
      value={{
        toastNotify,
        fetchAllCategory,
        fetchAllColor,
        fetchAllproduct,
        fetchSingleProduct,
        fetchAllAdminUser,
        fetchAllOrder,
        fetchAllSize,
        toast,
        allCategory,
        allColor,
        allProduct,
        singleProduct,
        allAdminUser,
        allOrder,
        allSize,
        API_BASE_URL,
        CATEGORY_URL,
        COLOR_URL,
        PRODUCT_URL,
        ADMIN_USER_URL,
        SIZE_URL,
        productColor,
        setProductColor,
        filterByColor,
        aSideBar,
        setASideBar,
      }}
    >
      {children}
      <Toaster
        position="top-right" // still required, but will be overridden
  containerStyle={{
    top: "20%",
    right: "20px",
  }}
  reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              padding: "10px",
              color: "#FFFFFF",
              background: "linear-gradient(145deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
              borderRadius: "0px",
              fontWeight: "500",
              animation: 'slideDown 0.3s ease-out',
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#000000",
            },
          },
          error: {
            style: {
              background: "linear-gradient(145deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
              color: "#FFFFFF",
              fontWeight: "500",
              padding: "10px",
              borderRadius: "0px",
              animation: 'slideDown 0.3s ease-out',
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#000000",
            },
          },
        }}

        
      />
    </MainContext.Provider>
  );
}
