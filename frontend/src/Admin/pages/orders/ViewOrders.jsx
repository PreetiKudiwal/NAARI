import React, { useContext, useEffect } from 'react'
import { MainContext } from '../../../context/Context';

export default function ViewOrders() {
    const {
        fetchAllOrder,
        allOrder,
        API_BASE_URL,
        toastNotify,
      } = useContext(MainContext);
    
      console.log(allOrder);

      useEffect ( () => {
        fetchAllOrder();
      }, [] )
  return (
   <div className="m-4">
      <h1 className="text-2xl font-bold my-8 text-white">All Orders</h1> 

      {
  allOrder && Array.isArray(allOrder) && allOrder.map((order, index) => (
    <div
      key={index}
      className="border rounded-xl mb-6 p-4 hover:shadow-md transition"
      style={{
            background:
              "linear-gradient(145deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
          }}
    >
      {/* Order Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-3 mb-3">
        <div>
          <p className="text-white font-medium text-sm">
            Order ID: <span>{order._id}</span>
          </p>
          <p className="text-sm text-white">
            Placed on: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="px-3 py-1 text-sm font-medium bg-blue-100 rounded-full">
            {order.order_status == 0 ? "Placed" : order.order_status == 1 ? "Confirmed" : order.order_status == 2 ? "Packed" : order.order_status == 3 ? "Shipped" : order.order_status == 4 ? "Out for Delivery" : order.order_status == 5 ? "Delivered" : order.order_status == 6 ? "Cancelled" : "Returned"}
          </span>
        </div>
      </div>

      {/* Product Preview */}
      {order?.product_details?.map((item, i) => (
        <div key={i} className="flex items-center gap-4 mb-2">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 rounded-lg"
          />
          <div className="flex-1">
            <h3 className="text-white text-sm">{item.name}</h3>
            <p className="text-sm text-white">
              Qty: {item.qty} × ₹{item.price}
            </p>
          </div>
          <p className="text-sm text-white">
            ₹{item.qty * item.price}
          </p>
        </div>
      ))}

      {/* Order Footer */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t">
        <p className="text-sm text-white">
          Payment Mode:{" "}
          <span className="font-medium">
            {order.payment_mode == 0 ? 'COD' : 'Online'}
          </span>
        </p>
        <p className='text-white text-sm'>Total: ₹{order.order_total}</p>
      </div>
    </div>
  ))
}
    </div>
  )
}
