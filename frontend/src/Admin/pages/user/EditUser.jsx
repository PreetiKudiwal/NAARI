import React from 'react'
import { useContext } from 'react';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainContext } from '../../../context/Context';
import axios from 'axios';
import { useEffect } from 'react';

export default function EditUser() {

    const {toastNotify, API_BASE_URL, ADMIN_USER_URL, allAdminUser, fetchAllAdminUser} = useContext(MainContext);
            const name = useRef();
            const email = useRef();
            const role=useRef()
            const {user_id} = useParams();
            const navigate = useNavigate();

            useEffect(
                        () => {
                            fetchAllAdminUser(user_id)
                        }, []
                    )

            const editUser = (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        const data ={
          name:name.current.value,
          email:email.current.value,
          role:role.current.value
        }
    
        axios.put(API_BASE_URL + ADMIN_USER_URL + "/edit/" + user_id, data).then(
              (success) => {
                toastNotify(success.data.msg, success.data.status);
                if (success.data.status == 1) {
                  event.target.reset();
                  navigate('/admin/user');
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
      <h2 className="text-2xl font-semibold mb-6 text-yellow-200">Edit User</h2>
      <form className="space-y-5" onSubmit={editUser}>
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
          defaultValue={allAdminUser.name}
            type="text"
           ref={name}
            className="w-full px-4 py-2 rounded-lg bg-gray-600"
            placeholder="Enter name"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
          defaultValue={allAdminUser.email}
            type="email"
            ref={email}
            className="w-full px-4 py-2 rounded-lg bg-gray-600"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Role</label>
          <select
          defaultValue={allAdminUser.role}
          ref={role}
            className="w-full px-4 py-2 rounded-lg bg-gray-600"
          >
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-yellow-200 w-full text-gray-700 font-medium px-6 py-2 rounded-lg hover:bg-yellow-300"
        >
          Update User
        </button>
      </form>
    </div>
  )
}
