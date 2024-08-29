import React from 'react'

const ProductCard = ({price, title}) => {
  return (
    <div className='w-[300px] h-[300px] rounded-sm bg-slate-200'>
      <img src="" alt="" />
      <div className="">
        <p>{price}</p>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default ProductCard
