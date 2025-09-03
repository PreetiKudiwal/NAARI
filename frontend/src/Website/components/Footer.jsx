import React from 'react'
import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-[#631801] text-white py-4 md:pt-12 px-6">
      <div className="w-full grid grid-cols-1 gap-6 md:gap-0 md:grid-cols-4 justify-between">
        {/* Brand Section */}
        <div>
          <Link to={'/'}>
          <div className='rounded-full flex items-center justify-center cursor-pointer group overflow-hidden bg-white w-24 h-24 md:w-[120px] md:h-[120px]'>
            <img src="/images/logo.png" alt="" className="w-20 md:w-24 group-hover:scale-105 transition duration-300" />
          </div>
          </Link>
          <p className="mt-4 text-sm text-white">
            A brand that celebrates Indian culture and tradition.
          </p>
          <div className='flex gap-5 text-white mt-4'>
            <span className='cursor-pointer hover:scale-125 transition duration-300'><BsFacebook /></span>
            <span className='cursor-pointer hover:scale-125 transition duration-300'><RiInstagramFill /></span>
            <span className='cursor-pointer hover:scale-125 transition duration-300'><FaTwitter /></span>
          </div>
          
        </div>

        {/* Shopping Links 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>

          <ul className="space-y-2 text-sm text-white pe-1">
            <li className='hover:underline cursor-pointer'>About Us</li>
            <li className='hover:underline cursor-pointer'>Customer Care</li>
            <li className='hover:underline cursor-pointer'>Terms & conditions for clients outside India</li>
            <li className='hover:underline cursor-pointer'>Terms & conditions for clients within India</li>
            <li className='hover:underline cursor-pointer'>Privacy and Cookies</li>
          </ul>
        </div>

        {/* Shopping Links 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Information</h3>
          <ul className="space-y-2 text-sm text-white">
            <li className='hover:underline cursor-pointer'>Returns and Exchanges</li>
            <li className='hover:underline cursor-pointer'>Store Policies</li>
            <li className='hover:underline cursor-pointer'>Shipping Options</li>
            <li className='hover:underline cursor-pointer'>FAQ's</li>
            <li className='hover:underline cursor-pointer'>How to Measure</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">NEWSLETTER</h3>
          <p className="text-sm text-white mb-4">
            Be the first to know about new arrivals, look books, sales & promos!
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Your email"
              className="w-full border-b border-gray-300 py-2 pr-10 bg-zinc-400 opacity-80 px-4 rounded placeholder-white text-sm outline-none"
            />
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-2 text-gray-400">
              ✉️
            </span>
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-8 border-t pt-4">
          &copy; 2025 <span className="text-sm font-semibold naari-font">
            नारी
            </span>. All rights reserved.
        </div>
      
    </footer>
  )
}
