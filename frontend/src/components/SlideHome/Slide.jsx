import React from 'react'

function Slide() {

  return (
    <div className='px-[8%] bg-white'>
        <div className="relative w-full h-[60vh] bg-amber-100 px-5 rounded-2xl mt-5 overflow-hidden">
  <img src="Slite.png" alt="background" className="absolute inset-0 w-full h-full object-cover rounded-2xl ml-55"
  />
  <div className="absolute inset-0 bg-black/30"></div>

  {/* Text Content */}
  <div className="relative z-10 flex flex-col justify-center h-full text-white px-10">
    <h1 className="text-4xl font-bold mb-3">
      Find the perfect paradise in your home
    </h1>
    <p className="text-lg max-w-xl">
      Find a luxury residence that suits you. We will help you find the most suitable
      residence for you.
    </p>
  </div>
</div>
    </div>
  )
}

export default Slide