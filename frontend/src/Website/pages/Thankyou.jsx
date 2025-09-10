import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';

export default function Thankyou() {
  const {order_id} = useParams();
  return (
    <>
    
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-4 overflow-hidden">

  {/* Card */}
  <div className="relative bg-white/70 backdrop-blur-xl shadow-2xl p-10 max-w-lg w-full text-center border border-white/40 animate-fadeIn">
  

    {/* Heading */}
    <h1 className="text-4xl font-extrabold color mb-3 font">
      Thank You for Your Order!
    </h1>

    {/* Subtext */}
    <p className="color text-sm mb-6">
      We truly appreciate your trust in us. A confirmation email has been
      sent with all the order details.
    </p>

    {/* Order Details */}
    <div className="bg-white/80 p-5 rounded-2xl shadow-inner text-left mb-6 border border-gray-200">
      <p className="color text-sm">
        <span className="font-bold">Order Id:</span> {order_id}
      </p>
      <p className="color text-sm">
        <span className="font-bold">Estimated Delivery:</span> 5–7 Business
        Days
      </p>
    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-between px-4">
      <div>
        <Link to={'/shop'}>
      <button className='bg-zinc-700 text-white shadow-lg rounded py-2 px-4 hover:opacity-90 transition transform hover:scale-105 duration-300'>Continue Shopping</button>
      </Link>
      </div>
      <div>
        <Link to={'/my/orders'}>
      <button className="px-6 py-2 text-white bg-zinc-700 rounded shadow-lg transition transform hover:scale-105 duration-300">
        View Orders
        </button>
        </Link>
        </div>
    </div>
  </div> 
    </div>
    </>
  )
}
