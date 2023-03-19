import React from 'react'
import brand1 from './../../images/brand/brand1.png'
import brand2 from './../../images/brand/brand2.png'
import brand3 from './../../images/brand/brand3.png'
import brand4 from './../../images/brand/brand4.png'
import brand5 from './../../images/brand/brand5.jpeg'
import brand6 from './../../images/brand/brand6.webp'

const Brands = () => {
  return (
    <section id="brand" class="container">
    <div class="row m=0 py-5">
     <img class="img-fluid col-lg-2 col-md-4 col-sm-6 p-5" src= {brand1} alt=""/>
     <img class="img-fluid col-lg-2 col-md-4 col-sm-6" src={brand2} alt=""/>
     <img class="img-fluid col-lg-2 col-md-4 col-sm-6 " src={brand3} alt=""/>
     <img class="img-fluid col-lg-2 col-md-4 col-sm-6 p-5" src={brand4} alt=""/>
     <img class="img-fluid col-lg-2 col-md-4 col-sm-6 p-5" src={brand5} alt=""/>
     <img class="img-fluid col-lg-2 col-md-4 col-sm-6 p-5" src={brand6} alt=""/>
    </div>
  </section>
  )
}

export default Brands
