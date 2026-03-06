import React from 'react'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";





function LastPage() {
  return (
    <div className='px-[8%] bg-white h-[75vh]' >
        <div className=' flex items-center w-full h-[70vh] bg-white rounded-2xl shadow-lg p-4 '>
            <div className="w-[30rem] h-[60vh]  rounded-2xl ml-4 overflow-hidden">
                <img src="https://i.pinimg.com/1200x/31/ad/d6/31add634f92ccd0004daf12b6a571722.jpg" alt="" className="w-full h-full object-cover" />
            </div>



            <div className='px-[4%]'>
              <div>
                <h1 className='font-semibold text-4xl'>We are the best and most
                  trusted real estate agent
                </h1> <br />
                <p className='font-medium text-xl'>We are a trusted real estate agent with more
                  than a decade of experience. You can trust us
                  </p> <br />
                </div>
                <div className="space-y-2">
      <div className="flex items-center gap-2">
        <IoMdCheckmarkCircleOutline className="text-green-500 text-xl" />
        <p>45k partners have worked with us</p>
      </div>

      <div className="flex items-center gap-2">
        <IoMdCheckmarkCircleOutline className="text-green-500 text-xl" />
        <p>Professional and experienced human resources</p>
      </div>

      <div className="flex items-center gap-2">
        <IoMdCheckmarkCircleOutline className="text-green-500 text-xl" />
        <p>Provide the best service for users</p>
      </div>
    </div>
            </div>
        </div>
    </div>
  )
}

export default LastPage