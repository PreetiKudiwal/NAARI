import React from "react";
import { useSelector } from "react-redux";
import MySidebar from "../components/MySidebar";
import { Outlet } from "react-router-dom";

export default function MyLayout() {
  const user = useSelector((state) => state.user.data);
  console.log(user);
  return (
    <>
    <div className="container mx-auto md:pb-14 min-h-svh bg-white">
      <div className="px-6 md:px-14 pb-2 md:border-b hidden md:block pt-16 fixed top-16 container mx-auto z-10 bg-white">
        <h1 className="text-2xl text-black font-semibold">Account</h1>
        <div className="text-sm color">{user?.name}</div>
      </div>
      <div className="grid grid-cols-6 md:mt-28">
        <div className="col-span-2 lg:col-span-1 border-e px-12 py-4 hidden md:block">
          <MySidebar />
        </div>
        <div className="col-span-6  md:col-span-4 lg:col-span-5 md:px-6 lg:px-12 py-4">
          <Outlet />
        </div>
      </div>
    </div>

    </>
  );
}
