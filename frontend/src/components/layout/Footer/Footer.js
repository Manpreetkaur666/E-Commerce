import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export const Footer = () => {
  return (
    <footer className="mt-5 py-5">
    <div className="row container mx-auto pt-5">

      {/* <!-- FOOTER ONE --> */}
      <div className="footer-one col-lg-3 col-md-6 col-12 mb-3">
        <img className="logo" src="images/logo/logo.png" alt=""/>
        <p className="pt-3">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
      </div>

      {/* <!-- FOOTER TWO --> */}
      <div className="footer-two col-lg-3 col-md-6 col-12 mb-3">
        <h5 className="pb-2">Featured</h5>
        <ul className="text-uppercase list-unstyled">
          <li><Link to="#">men</Link></li>
          <li><Link to="#">women</Link></li>
          <li><Link to="#">boys</Link></li>
          <li><Link to="#">girls</Link></li>
          <li><Link to="#">new arrivals</Link></li>
          <li><Link to="#">shoes</Link></li>
        </ul>
    </div>

        {/* <!-- FOOTER THREE --> */}
    <div className="footer-three col-lg-3 col-md-6 col-12 mb-3">
         <h5 className="pb-2">Contact Us</h5> 
         <div>
          <h6 className="text-uppercase">Address</h6>
          <p>Mississauga, ON</p>
         </div>
          
         <div>
          <h6 className="text-uppercase">Phone Number</h6>
          <p>+1(705)9707666</p>
         </div>

         <div>
          <h6 className="text-uppercase">Email</h6>
          <Link to="mailto:mk27982@gmail.com">mk27982@gmail.com</Link>
         </div>

     </div>

        {/* <!-- FOOTER FOUR --> */}
    <div className="footer-four col-lg-3 col-md-6 col-12 mb-3">
        <h5 className="pb-2">Instagram</h5>
        <div className="row">
          <img className="img-fluid w-25 h-100 m-2" src="Images/instagram/insta1.jpg" alt=""/>
          <img className="img-fluid w-25 h-100 m-2" src="Images/instagram/insta2.jpg" alt=""/>
          <img className="img-fluid w-25 h-100 m-2" src="Images/instagram/insta3.jpg" alt=""/>
          <img className="img-fluid w-25 h-100 m-2" src="Images/instagram/insta4.jpg" alt=""/>
          <img className="img-fluid w-25 h-100 m-2" src="Images/instagram/insta5.jpg" alt=""/>
        </div>
    </div>
    </div>

    <div className="copyright mt-5">
      <div className="row container mx-auto">

        <div className="col-lg-3 col-md-6 col-12 mb-4">
           <img className="h-60 w-50" src="Images/img/payment.jpeg" alt="" />
        </div>

        <div className="col-lg-4 col-md-6 col-12 text-nowrap mb-2">
          <p>ManSe STORE eCommerce @2022. All Rights Reserved</p>
       </div>

       <div className="col-lg-4 col-md-6 col-12 ml-5">
        <Link to=""><i className="fa-brands fa-facebook-f"></i></Link> 
        <Link to=""><i className="fa-brands fa-twitter"></i></Link>
        <Link to=""><i className="fa-brands fa-instagram"></i></Link>
     </div>

      </div>
    </div>
   </footer>
  )
}
