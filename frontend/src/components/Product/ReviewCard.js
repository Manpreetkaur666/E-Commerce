import React from 'react'
import { Rating } from "@material-ui/lab";
import profilepng from '../../images/profilepng.png';
import './productDetail.css'

const ReviewCard = ( {review} ) => {


  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className='reviewCard'>
      <div className='review-profile'>
        <img src={profilepng} alt="User"/>
        <p>{ review.name }</p>
      </div>
      <div className='review-comment'>
      <Rating {...options} />
      <span>{ review.comment }</span>
      </div>     
    </div>
  )
}

export default ReviewCard
