import React, { useEffect } from "react";
import Header from "./components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { lsGetData } from "../Redux/Reducer/CartSlice";
import { UserLogin } from "../Redux/Reducer/UserSlice";
import ScrollToTop from "./components/ScrollToTop";

export default function WebsiteLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const lsData = JSON.parse(localStorage.getItem("userLogin"));
    const lsToken = localStorage.getItem("userToken");
    if (lsData) {
      dispatch(UserLogin({ data: lsData, token: lsToken }));
    }
  }, []);

  useEffect(() => {
    dispatch(lsGetData());
  }, []);
  return (
    <>
    <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
