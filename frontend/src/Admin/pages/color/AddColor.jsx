import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useRef } from 'react';
import { MainContext } from '../../../context/Context';

export default function AddColor() {

    const {toastNotify, API_BASE_URL, COLOR_URL} = useContext(MainContext);
    const colorName = useRef();
    const colorSlug = useRef();
    const colorCode=useRef()
  
    const createSlug = () => {
      colorSlug.current.value = colorName.current.value.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

  const addColor = (event) => {
    event.preventDefault();
    const formData = new FormData();

    const data ={
      colorName:colorName.current.value,
      colorSlug:colorSlug.current.value,
      colorCode:colorCode.current.value
    }

    axios.post(API_BASE_URL + COLOR_URL + "/create", data).then(
          (success) => {
            toastNotify(success.data.msg, success.data.status);
            if (success.data.status == 1) {
              event.target.reset();
            }
            console.log(success);
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        )
  }
  return (
     <div className="max-w-xl mx-auto p-6 shadow rounded-2xl text-white mt-10"
    style={{
            background:
              "linear-gradient(145deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
          }}>
         <h2 className="text-2xl font-semibold text-yellow-200 mb-4">Add Color</h2>
         <form onSubmit={addColor}>
           <div className="mb-4">
             <label className="block font-medium mb-2">Color Name</label>
             <input
              onChange={createSlug}
               ref={colorName}
               type="text"
               className="w-full p-2 rounded-md bg-gray-600"
               placeholder="Enter color name"
               required
             />
           </div>
           <div className="mb-4">
             <label className="block font-medium mb-2">Color Slug</label>
             <input
              readOnly
               ref={colorSlug}
               type="text"
               className="w-full p-2 rounded-md focus:outline-none bg-gray-800"
               placeholder="Enter color slug"
               required
             />
           </div>

           <div className="mb-4">
             <label className="block font-medium mb-2">
               Pick a Color
             </label>
             <input
              ref={colorCode}
               type="color"
               className="w-full h-6 p-1 border rounded-md cursor-pointer"
             />
           </div>
           <button
             type="submit"
             className="w-full bg-yellow-200 text-gray-700 text-[18px] font-medium py-2 rounded-md hover:bg-yellow-300"
           >
             Add Color
           </button>
         </form>
       </div>
    
  )
}
