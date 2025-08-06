import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../context/Context";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Orders() {
  const { API_BASE_URL, fetchAllOrder, allOrder, toastNotify } =
    useContext(MainContext);
  const user = useSelector((state) => state.user.data);
  console.log(allOrder, "context");

  useEffect(() => {
    if (user?._id) {
      fetchAllOrder(user?._id);
    }
  }, [user]);

  return (
    <div className="w-full mx-auto px-2 lg:px-20 pb-6 md:py-6 border-t-0 md:border-t border">
      <div className="flex justify-between items-center border-b px-4 pb-2 mb-4">
        <h2 className="text-lg font-bold">All Orders</h2>
      </div>
      {Array.isArray(allOrder) &&
        allOrder?.map((order, index) => (
          <div key={index} className="border-y p-4 mb-6 transition color">
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm font-semibold">Order ID: {order._id}</p>
                <p className="text-xs">Placed on: </p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.order_status === 1
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.order_status === 1 ? "Delivered" : "Out for Delivery"}
                </span>
              </div>
            </div>

            {Array.isArray(order.product_details) &&
              order.product_details.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 mb-4">
                  <img
                    src={API_BASE_URL + `/images/product/${item.image}`}
                    alt={item.name}
                    className="w-24 h-28 object-cover rounded-md border"
                  />
                  <div className="flex-1 space-y-4">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.qty} | ₹{item.total}
                    </p>
                  </div>
                </div>
              ))}

            <div className="flex justify-between mt-4">
              <p className="font-bold text-md text-gray-800">Total Amount:</p>
              <p className="font-bold text-md text-gray-800">
                ₹{order.order_total}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
