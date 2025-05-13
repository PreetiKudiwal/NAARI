import React from 'react'
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom"
import WebsiteLayout from './Website/WebsiteLayout'
import AdminLayout from './Admin/pages/AdminLayout'
import Shop from './Website/pages/Shop'
import AdminDashBoard from './Admin/pages/AdminDashBoard'
import ViewCategory from './Admin/pages/category/ViewCategory'
import AddCategory from './Admin/pages/category/AddCategory'
import ViewColor from './Admin/pages/color/ViewColor'
import AddColor from './Admin/pages/color/AddColor'
import ViewProducts from './Admin/pages/products/ViewProducts'
import AddProducts from './Admin/pages/products/AddProducts'
import Context from './context/Context'
import EditCategory from './Admin/pages/category/EditCategory'
import EditColor from './Admin/pages/color/EditColor'
import MultipleImage from './Admin/pages/products/MultipleImage'
import EditProducts from './Admin/pages/products/EditProducts'
import Login from './Admin/pages/Login'
import Home from './Website/pages/Home'
import Cart from './Website/pages/Cart'
import Detail from './Website/pages/Detail'
import CheckOut from './Website/pages/CheckOut'
import UserLogin from './Website/pages/UserLogin'
import UserRegister from './Website/pages/UserRegister'
import Thankyou from './Website/pages/Thankyou'
import Setting from './Admin/pages/Setting'
import ViewUser from './Admin/pages/user/ViewUser'


export default function App() {

  const routes = createBrowserRouter(

    [
      {
        path: "/",
        element: <WebsiteLayout />,
        children : [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "/shop/:categorySlug?",
            element: <Shop />
          },
          {
            path: "/cart",
            element: <Cart />
          },
          {
            path: "/detail",
            element: <Detail />
          },
          {
            path: "/checkout",
            element: <CheckOut />
          },
          {
            path: "/thankyou",
            element: <Thankyou />
          }
        ]
      },
      {
        path: "/userlogin",
        element: <UserLogin />
      },
      {
        path: "/userregister",
        element: <UserRegister />
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <AdminDashBoard />
          },
          {
            path: "category",
            element: <ViewCategory />
          },
          {
            path: "category/add",
            element: <AddCategory />
          },
          {
            path: "category/edit/:category_id",
            element: <EditCategory />
          },
          {
            path: "color",
            element: <ViewColor />
          },
          {
            path: "color/add",
            element: <AddColor />
          },
          {
            path: "color/edit/:color_id",
            element: <EditColor />
          },
          {
            path: "products",
            element: <ViewProducts />
          },
          {
            path: "products/add",
            element: <AddProducts />
          },
          {
            path: "products/multipleimage/:product_id",
            element: <MultipleImage />
          },
          {
            path: "products/edit/:product_id",
            element: <EditProducts />
          },
          {
            path: "setting",
            element: <Setting />
          },
          {
            path: "user",
            element: <ViewUser />
          }
        ]
      },
      {
        path: "/admin/login",
        element: <Login />
      }

    ]
  )
  return (
    <Context>
    <RouterProvider router={routes} />
    </Context>
  )
}
