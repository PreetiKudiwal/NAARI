import axios from 'axios';
import React, { useState } from 'react'
import { createContext } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

export const MainContext = createContext();

export default function Context({children}) {

    const [aSideBar, setASideBar] = useState(true);
    const [allCategory, setAllCategory] = useState([]);
    const [allColor, setAllColor] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    const [allAdminUser, setAllAdminUser] = useState([]);
    const [productColor, setProductColor] = useState(null);
    const token = useSelector((state) => state.admin.token);

    const API_BASE_URL = "http://localhost:5001";
    const CATEGORY_URL = "/category";
    const COLOR_URL = "/color";
    const PRODUCT_URL = "/product";
    const ADMIN_USER_URL = "/admin"

    const toastNotify = (msg, status) => toast(msg, { type: status == true ? "success" : "error"});

    //fetch allcategory start

    const fetchAllCategory = (category_id = null) => {
      let categoryApiUrl = API_BASE_URL + CATEGORY_URL;

      if (category_id) {
        categoryApiUrl += `/${category_id}`;
      }
      axios.get(categoryApiUrl,
        {
          headers: {
            Authorization: token
          }
        }
      ).then(
        (success) => {
          setAllCategory(success.data.category);
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    }

    //fetch allcategory end

    //fetch allcolor start

    const fetchAllColor = (color_id = null) => {
      let colorApiUrl = API_BASE_URL + COLOR_URL;

      if (color_id) {
        colorApiUrl += `/${color_id}`;
      }

      axios.get(colorApiUrl).then(
        (success) => {
          setAllColor(success.data.color);
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    }

    //fetch allcolor end

    //fetch allproduct start

    const fetchAllproduct = (product_id = null, limit = 0, categorySlug = null, productColor = null) => {
      let productApiUrl = API_BASE_URL + PRODUCT_URL;

      if (product_id) {
        productApiUrl += `/${product_id}`;
      }

      const query = new URLSearchParams();
      query.append("limit", limit );
      query.append("categorySlug", categorySlug)
      query.append("productColor", productColor)

      axios.get(productApiUrl + "?" + query).then(
        (success) => {
          setAllProduct(success.data.product);
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    }

    //fetch allproduct end

    //fetch allAdminUser start

    const fetchAllAdminUser = (admin_id = null) => {
      let adminApiUrl = API_BASE_URL + ADMIN_USER_URL;

      if (admin_id) {
        adminApiUrl += `/${admin_id}`;
      }

      axios.get(adminApiUrl).then(
        (success) => {
          setAllAdminUser(success.data.admin);
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    }

    //fetch allAdminUser end

    //filter by color start

    const filterByColor = (id) => {
      setProductColor(id);
    }

    //filter by color start

  return (
    <MainContext.Provider value={{toastNotify, fetchAllCategory, fetchAllColor, fetchAllproduct, fetchAllAdminUser, allCategory, allColor, allProduct, allAdminUser, 
                                  API_BASE_URL, CATEGORY_URL, COLOR_URL, PRODUCT_URL, ADMIN_USER_URL, productColor, setProductColor, filterByColor, aSideBar, setASideBar}}>
        {children}
        <Toaster position = 'top-right'/>
    </MainContext.Provider>
  )
}
