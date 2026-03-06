import React from 'react'

import Slide from '../SlideHome/Slide'
import Properties from '../properties/Properties'
import LastPage from '../LastPage/LastPage'
import Footer from '../footer/Footer'
import Client from '../LastPage/Client'

function Home() {
  return (
    <div>
      
        <Slide/>
        {/* <Properties/> */}
        <Client/>
        <LastPage/>
        <Footer/>
        {/* <ProductList/> */}
        {/* <House/> */}
        {/* <Apartment/> */}
        {/* <Room/> */}

    </div>
  )
}

export default Home