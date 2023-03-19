import React from 'react';
// import './Home.css'
import highlight1 from './../../images/highlight/Image1.jpg'
import highlight2 from './../../images/highlight/Image2.jpg'
import highlight3 from './../../images/highlight/Image3.jpg'

const Highlights = () => {
  return (
    
    <section id="new" class="w-100">
      <div class="row p-0 m-0">
        {/* <!-- IMAGE 1 --> */}
        <div class="one col-lg-4 col-md-12 col-sm-12 p-0">
          <img class="img-fluid" src={highlight1} alt=""/>
          <div class="details">
            <h2>Extreme Rare Sneakers</h2>
            <button class="text-uppercase">Shop Now</button>
          </div>
        </div>
        {/* <!-- IMAGE 2 --> */}
        <div class="one col-lg-4 col-md-12 col-sm-12 p-0">
          <img class="img-fluid" src={highlight2} alt=""/>
          <div class="details">
            <h2>Awesome Blank Outfit</h2>
            <button class="text-uppercase">Shop Now</button>
          </div>
        </div>
        {/* <!-- IMAGE 3 --> */}
        <div class="one col-lg-4 col-md-12 col-sm-12 p-0">
          <img class="img-fluid" src={highlight3} alt=""/>
          <div class="details">
            <h2>Sportwear Upto 50% Off</h2>
            <button class="text-uppercase">Shop Now</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Highlights
