import React, { useContext, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { Outlet, useParams } from "react-router-dom";
import { MainContext } from "../../context/Context";
import { useSelector } from "react-redux";

export default function AdminLayout() {
  const { aSideBar, setASideBar } = useContext(MainContext);
  const admin = useSelector((state) => state.admin.data);
  console.log(admin,"admin from admin layout");
  const user = useSelector((state) => state.user.data);
  console.log(user,"user from admin layout");

  return (
    <div className="relative grid grid-cols-6 bg-black min-h-screen">
  {/* Sidebar */}
  <div className={`col-span-1 ${aSideBar === false ? "hidden" : ""}`}>
    <div className="sticky top-0 z-50 bg-black shadow-lg shadow-neutral-600">
      <AdminSidebar />
    </div>
  </div>

  {/* Main content area */}
  <div className={`${aSideBar === false ? "col-span-6" : "col-span-5"}`}>
    <div className="sticky top-0 z-40 bg-black shadow-md shadow-neutral-600">
      <AdminHeader />
    </div>
    <Outlet />
  </div>
</div>
  );
}
