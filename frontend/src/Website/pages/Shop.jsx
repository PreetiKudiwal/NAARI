import React, { useContext, useEffect, useState } from 'react'
import Filter from '../components/Filter'
import Products from '../components/Products'
import { MainContext } from '../../context/Context';
import {useParams, useSearchParams} from 'react-router-dom'

export default function Shop() {

  const {fetchAllproduct, productColor} = useContext(MainContext);

  const [limit, setLimit] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams()
  const {categorySlug} = useParams();

  useEffect(
    () => {
      if(searchParams.get("limit")) {
        setLimit(searchParams.get("limit"));
      }
    }, []
  )
  

  useEffect(
    () => {
      const query = {};
      if(productColor) {
        query.productColor = productColor
      }
      query.limit = limit
      fetchAllproduct( null, limit, categorySlug, productColor);
      setSearchParams(query);
    }, [limit, categorySlug, productColor]
  )
  return (
    <div>
      <div className='grid grid-cols-6 pt-4'>
        <div className='col-span-1'></div>
        <div className='col-span-5 px-5'>
        <select name="" id="" className='border px-4 rounded-md' onChange={(e) => setLimit(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
        </div>
      </div>
    <div className='grid grid-cols-6'>
      <div className='col-span-1'>
        <Filter />
      </div>
      <div className='col-span-5'>
        <Products />
      </div>
    </div>
    
    </div>
  )
}
