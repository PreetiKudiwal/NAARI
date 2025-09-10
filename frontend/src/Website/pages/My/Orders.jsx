import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../context/Context";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Orders() {
  const { API_BASE_URL, fetchAllOrder, allOrder, toastNotify } =
    useContext(MainContext);
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const [loadingUser, setLoadingUser] = useState(true);



  useEffect(() => {
    setLoadingUser(true);
    setTimeout(() => {
      setLoadingUser(false);
    }, 100);
      fetchAllOrder(user?._id);
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        navigate("/userlogin?ref=profile");
      }
    }, 100); 
  
    return () => clearTimeout(timer);
  }, [user]);

  return (
    <>
      {
      loadingUser ? (
        <div className="w-full min-h-svh flex mt-10 justify-center"></div>
      ) : (
        allOrder?.length === 0 ? (
        <div className="w-full min-h-svh flex justify-center mt-4 items-center md:items-start">
          <div className="text-center">
            <div className="w-64 h-56 mx-auto">
              <img
                src="/images/order1.png"
                alt="order"
                className="w-full h-full"
              />
            </div>
            <div className="text-sm font-bold color">NO ORDERS YET!</div>
            <div className="text-sm font-medium color">
              Browse our collection and place your first order.
            </div>
            <div>
              <Link to={"/"}>
                <button className="px-6 text-sm font-bold py-2 border border-black mt-8 text-black">
                  + Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full mx-auto px-2 lg:px-20 pb-6 md:py-6 border-t-0 md:border-t border">
          <div className="flex justify-between items-center border-b px-4 pb-2 mb-4">
            <h2 className="text-lg font-bold">All Orders</h2>
          </div>
          {Array.isArray(allOrder) &&
            allOrder?.map((order, index) => (
              <div key={index} className="border-y p-4 mb-6 transition color">
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold">
                      Order ID: {order._id}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap bg-yellow-100 text-yellow-600 
                        `}
                    >
                      Confirmed
                    </span>
                  </div>
                </div>

                {Array.isArray(order.product_details) &&
                  order.product_details.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 mb-4">
                      <img
                        src={API_BASE_URL + `/images/product/${item.image}`}
                        alt={item.name}
                        className="w-24 h-28 cover rounded-md border"
                      />
                      <div className="flex-1 space-y-4">
                        <p className="truncate w-[200px] lg:w-auto font-semibold text-sm">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.qty} | ₹{(item.total).toLocaleString(
                      "en-IN"
                    )}
                        </p>
                      </div>
                    </div>
                  ))}

                <div className="flex justify-between mt-4">
                  <p className="font-bold text-md text-gray-800">
                    Total Amount:
                  </p>
                  <p className="font-bold text-md text-gray-800">
                    ₹{(order.order_total).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )
      )
      }
    </>
  );
}
