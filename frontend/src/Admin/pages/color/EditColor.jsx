import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MainContext } from '../../../context/Context';
import axios from 'axios';

export default function EditColor() {

    const {toastNotify, API_BASE_URL, COLOR_URL, allColor, fetchAllColor} = useContext(MainContext);
        const colorName = useRef();
        const colorSlug = useRef();
        const colorCode=useRef()
        const {color_id} = useParams();
        const navigate = useNavigate();

        useEffect(
            () => {
                fetchAllColor(color_id)
            }, []
        )
      
        const createSlug = () => {
          colorSlug.current.value = colorName.current.value.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        }
    
      const editColor = (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        const data ={
          colorName:colorName.current.value,
          colorSlug:colorSlug.current.value,
          colorCode:colorCode.current.value
        }
    
        axios.put(API_BASE_URL + COLOR_URL + "/edit/" + color_id, data).then(
              (success) => {
                toastNotify(success.data.msg, success.data.status);
                if (success.data.status == 1) {
                  event.target.reset();
                  navigate('/admin/color');
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
         <h2 className="text-2xl font-semibold mb-4 text-yellow-200">Edit Color</h2>
         <form onSubmit={editColor}>
           <div className="mb-4">
             <label className="block font-medium mb-2">Color Name</label>
             <input
             defaultValue={allColor.colorName}
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
             defaultValue={allColor.colorSlug}
              readOnly
               ref={colorSlug}
               type="text"
               className="w-full p-2 rounded-md bg-gray-800 focus:outline-none"
               placeholder="Enter color slug"
               required
             />
           </div>

           <div className="mb-4">
             <label className="block font-medium mb-2">
               Pick a Color
             </label>
             <input
             defaultValue={allColor.colorCode}
               ref={colorCode}
               type="color"
               className="w-full h-6 p-1 border rounded-md cursor-pointer"
             />
           </div>
        <button
          type="submit"
          className="bg-yellow-200 w-full text-gray-700 font-medium py-2 rounded-lg hover:bg-yellow-300"
        >
          Update Color
        </button>
         </form>
       </div>
  )
}
