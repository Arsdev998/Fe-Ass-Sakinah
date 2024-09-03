import React from 'react'
import { FaCheckCircle } from "react-icons/fa";

const Confirmation = () => {
  return (
    <div className='w-full min-h-[80vh] flex justify-center items-center'>
      <div className="flex gap-2 justify-center  items-center w-[300px] h-[300px] shadow-md rounded-full  bg-green-500">
        <h1 className='text-white font-bold text-xl'>Pembayaran Berhasil</h1>
        <FaCheckCircle className='text-xl text-white shadow-md'/>
      </div>
    </div>
  )
}

export default Confirmation
