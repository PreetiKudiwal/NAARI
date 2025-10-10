import React, { useEffect, useState } from 'react'
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
import EditUser from './Admin/pages/user/EditUser'
import MyLayout from './Website/pages/MyLayout'
import ViewProfile from './Website/pages/My/Profile/ViewProfile'
import EditProfile from './Website/pages/My/Profile/EditProfile'
import ViewAddress from './Website/pages/My/Profile/Address/ViewAddress'
import AddAddress from './Website/pages/My/Profile/Address/AddAddress'
import Orders from './Website/pages/My/Orders'
import AddSize from './Admin/pages/size/AddSize'
import ViewSize from './Admin/pages/size/ViewSize'
import EditSize from './Admin/pages/size/EditSize'
import Wishlist from './Website/pages/Wishlist'
import Contact from './Website/pages/Contact'
import About from './Website/pages/About'
import AdminRoute from './Admin/components/AdminRoute'
import { useDispatch } from 'react-redux'
import { logout } from './Redux/Reducer/AdminSlice'
import SplashScreen from './Website/components/SplashScreen'

export default function App() {

  const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      // Check if splash has been shown before
      const hasShownSplash = localStorage.getItem("splashShown");
  
      if (!hasShownSplash) {
        setLoading(true);
        const timer = setTimeout(() => {
          setLoading(false);
          localStorage.setItem("splashShown", "true"); 
        }, 6000);
  
        return () => clearTimeout(timer);
      }
    }, []);
  

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
            path: "/contact",
            element: <Contact />
          },
          {
            path: "/about",
            element: <About />
          },
          {
            path: "/cart",
            element: <Cart />
          },
          {
            path: "/detail/:product_id",
            element: <Detail />
          },
          {
            path: "/checkout",
            element: <CheckOut />
          },
          {
            path: "/wishlist",
            element: <Wishlist />
          },
          {
            path: "/my",
            element: <MyLayout />,
            children: [
              {
                path: "profile",
                element: <ViewProfile />,
              },
              {
                path: "profile/edit",
                element: <EditProfile />
              },
              {
                path: "address",
                element: <ViewAddress />
              }, 
              {
                path: "address/add",
                element: <AddAddress />
              }, 
              {
                path: "orders",
                element: <Orders />
              }
            ]
          },
          {
            path: "/thankyou/:order_id?",
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
        element: <AdminRoute />,
        children: [
      {
        path: "",
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
          },
          {
            path: "user/edit/:user_id",
            element: <EditUser />
          },
          {
            path: "size",
            element: <ViewSize />
          }, 
          {
            path: "size/add",
            element: <AddSize />
          },
          {
            path: "size/edit/:size_id",
            element: <EditSize />
          }
        ]
      } ]
      },
      {
        path: "/admin/login",
        element: <Login />
      }

    ]
  );

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Context>
    <RouterProvider router={routes} />
    </Context>
  )
}
