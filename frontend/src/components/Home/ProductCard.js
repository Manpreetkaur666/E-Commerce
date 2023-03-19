import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Rating } from "@material-ui/lab";
import './productCard.css';


export const Product = ({product}) => {

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    
    <Fragment>   
    <Link className="product text-center col-lg-3 col-md-4 col-12" to = {`/product/${product._id}`}>
          <img className="img-fluid mb-3" src={product.images[0].url} alt={product.name}/>
          <div className='reviewsSection'>
            <div> 
            <Rating {...options} /> 
            </div>          
          <span>{product.totalReviews} Reviews</span>
          </div>
          <h4 className="product_name">{product.name}</h4>
          <h5 className="product_price">{product.price}</h5>
          <button className="buy_btn mb-2">Buy Now</button>
        </Link>    
       
  </Fragment>
  )
}
