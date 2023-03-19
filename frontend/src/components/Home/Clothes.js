import React from 'react'

const Clothes = () => {
  return (
    <section id="clothes" class="my-5 pb-5">
      <div class="container text-center mt-5 py-5">
        <h3>Dress and Jumpsuits</h3>
        <hr class="mx-auto"/>
        <p>Here you can check our new producte at reasonable prices.</p>
      </div>
      <div class="row mx-auto container-fluid">

      
        <div class="product text-center col-lg-3 col-md-4 col-12">
          <img class="img-fluid mb-3" src="Images/clothes/clothes1.jpg" alt=""/>
          <div class="star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <h5 class="product_name">Sport Boots</h5>
          <h4 class="product_price">$ 92.99</h4>
          <button class="buy_btn">Buy Now</button>
        </div>

      </div>
    </section>
  )
}

export default Clothes
