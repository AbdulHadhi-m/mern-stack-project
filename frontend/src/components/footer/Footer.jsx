import React from 'react'



function Footer() {
  return (
    <div className=' '>
        <div className='w-full h-[25vh] bg-gray-400' >
            <div className='flex w-full h-[35vh]  '>
                <div className='w-[35%] h-[35vh] bg-green-900 text-white '>
                    <h1 className='text-4xl font-bold ml-4 pt-8'>Rentora</h1><br />
                    <p className='ml-4 font-semibold'>Rentora connects you with verified properties <br /> for a seamless renting experience.</p>
                </div>
                <div className='w-[30%] h-[35vh] bg-green-900 text-amber-50 px-3 pt-10  '>
                    <h1 className='font-semibold'>Quick Links</h1> <br />
                    <a href="">Home</a>
                    <br />
                    <a href="">About</a>
                    <br />
                    <a href="">Contact</a>
                    <br />
                    <a href="">Privacy Policy</a>
                    <br />
                    <a href="">FAQs</a>

                </div>
                <div className='w-[30%] h-[35vh] bg-green-900 text-amber-50 px-3 pt-10'>
                    <h1 className='font-semibold'>Services</h1> <br />
                    <a href="">Houses</a> <br />
                    <a href="">Apartments</a> <br />
                    <a href="">Flats</a> <br />
                    <a href="">Rooms</a> <br />
                   
                </div>
                <div className='w-[30%] h-[35vh] bg-green-900 text-amber-50 px-3 pt-10 flex-col '>
                    <h1 className='font-semibold'>Contact Info</h1> <br />
                    <a href="">Address: 412 Evergreen Plaza, 7th Floor, Sector 21, Newbridge, CA 94016, USA</a> <br />
                    <a href="">Phone: +1 (555) 723-4810</a> <br />
                    <a href="">Email(support): support@rentora.example</a> <br />
                    <a href="">Email(general): hello@rentora.example</a>
                   

              
                   
                </div>
            </div>

        </div>



    <div className='w-full h-[10vh]  text-amber-50 flex justify-center items-center'>
        <div>
         Copyright&copy; Rentora {new Date().getFullYear()} All rights reserved.
        </div>

    </div>
    </div>
  )
}

export default Footer