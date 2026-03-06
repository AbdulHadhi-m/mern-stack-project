import React from 'react'

function Client() {
  return (
    <div className='w-full h-auto bg-white px-[8%] py-10 flex flex-col md:flex-row items-center justify-around gap-6 md:gap-0 text-center md:text-left'>
        
      <div className='flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3.5'>
        <h1 className='text-4xl font-semibold'>120k</h1>
        <p className='font-semibold'>
          People believe <br /> in our service
        </p>
      </div>

      <div className='flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3.5'>
        <h1 className='text-4xl font-semibold'>3200</h1>
        <p className='font-semibold'>
          Property and house <br /> ready for occupancy
        </p>
      </div>

      <div className='flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3.5'>
        <h1 className='text-4xl font-semibold'>45k</h1>
        <p className='font-semibold'>
          Partners who have <br /> worked with us
        </p>
      </div>

    </div>
  )
}

export default Client;
