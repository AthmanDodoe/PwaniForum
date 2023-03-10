import React from 'react'
import CategoryIcon from './CategoryIcon';
import { PlusIcon } from '@heroicons/react/24/solid';


const Category = () => {
  return (
    <div>
      
      <div className='flex flex-col space-y-3 bg-slate-300 p-5 rounded-full w-13'>
        <CategoryIcon image="https://rb.gy/qidcpp" />
        <CategoryIcon image="https://rb.gy/qidcpp" />
        <CategoryIcon image="https://rb.gy/qidcpp" />
        <CategoryIcon image="https://rb.gy/qidcpp" />

        <div className='rounded-full h-9 p-2'>
          <PlusIcon className='hover:bg-blue-300 h-8 rounded-md hover:text-white'/>
        </div>
      </div>
        
       
    </div>
  )
}

export default Category