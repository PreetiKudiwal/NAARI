import React, { use } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function ViewProfile() {
  const user = useSelector((state) => state.user.data);
  const displayOrNA = (value) => (value ? value : '- not added -');

  return (
    
    <div className="w-full mx-auto px-2 lg:px-40 pb-6 md:py-6 bg-white border-t-0 md:border-t border">
      <h2 className="text-lg font-bold border-b pb-2 mb-4">Profile Details</h2>
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Full Name</span>
          <span>{displayOrNA(user?.name)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Mobile Number</span>
          <span>{displayOrNA(user?.contact)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email ID</span>
          <span>{displayOrNA(user?.email)}</span>
        </div>
        <div className="flex justify-between">
  <span className="font-medium">Location</span>
  <span>
    {user?.shipping_address?.[0]
      ? `${user.shipping_address[0].addressLine1}, ${user.shipping_address[0].city}, ${user.shipping_address[0].state}`
      : '- not added -'}
  </span>
</div>
      </div>
      <Link to={"/my/profile/edit"}>
      <button className="mt-6 w-full custom-button text-white font-bold py-2 rounded">
        EDIT
      </button>
      </Link>
    </div>
  )
}
