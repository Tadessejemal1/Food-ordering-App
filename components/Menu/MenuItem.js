import React from 'react'

const MenuItem = () => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='bg-gray-300 p-4 rounded-lg text-center'>
        <img className='max-h-auto max-h-24 mx-auto' src='/pizza.png' alt='pizza' />
        <h4 className='font-semibold my-2'>Pepperoni Pizza</h4>
        <p className='text-gray-500 text-sm'>lorem ipsum dolor sit amet hjdjhjdfhdhjfhdk</p>
        <button className='bg-primary text-white px-6 py-2 rounded-full'>Add to cart $12</button>
      </div>
    </div>
  )
}

export default MenuItem
