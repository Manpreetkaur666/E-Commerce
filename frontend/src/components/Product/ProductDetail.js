import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetail, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import './productDetail.css';
import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader';
import { addToCart } from '../../actions/cartAction';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../constants/productConstants';


export const ProductDetail = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.productdetail);
  const { success, error: reviewError } = useSelector((state) => state.newReview);

  // var quantity = 1;
  const [quantity, setQuantity] = useState(1);
  const [stockAlert, setStockAlert] = useState("");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if(quantity < product.stock){
      const qty = quantity + 1;
      setQuantity(qty);
    }else{
        setStockAlert(`Only ${product.stock} left in stock.`);
    } 
  }

  const decreaseQuantity = () => {
    if(quantity > 1){
      const qty = quantity - 1;
      setQuantity(qty)
    }
}
  
  const addItemToCartHandler = () => {
    dispatch(addToCart(id, quantity));
  };


  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };


useEffect(() => {
  if(error){
    console.log(error);
    dispatch(clearErrors());
  }
  if (reviewError) {
    console.log(reviewError);
    dispatch(clearErrors());
  }

  if (success) {
    console.log("Review Submitted Successfully");
    dispatch({ type: NEW_REVIEW_RESET });
  }
  dispatch(getProductDetail(id))
}, [dispatch, id, error, reviewError, success]);


  return (
    <Fragment>
      {loading ? <Loader /> : (<div>
        <MetaData title={`${product.name} -- ManSe`} />
        <section className="product_detail container my-4 pt-3">
          <div className="row mt-5">

            <div className="img-container col-lg-5 col-md-12 col-12">
              {product.images && product.images.map((item) => (
                <img className="product-img img-fluid w-100 mb-1" key={item.url} src={item.url} id="MainImg" alt="" />
              ))}
            </div>

            <div className="col-lg-6 col-md-12 col-12">
              <h1>{product.name}</h1>
              <div className='reviews'>
                <Rating {...options} /> <span>{product.totalReviews} Reviews</span>
              </div>
              <p className="pb-4">{product.category}</p>
              <h2>$ {product.price}</h2>
              <select className="my-3">
                <option>Select size</option>
                <option>XL</option>
                <option>XXL</option>
                <option>LARGE</option>
                <option>SMALL</option>
              </select>

              <button className='minus' onClick={decreaseQuantity}>-</button>
              <input readOnly type="number" value={quantity} />
              <button className='plus' onClick={increaseQuantity}>+</button>

              <button className="buy-btn" disabled={product.stock < 1 ? true : false} onClick={addItemToCartHandler}>Add to Cart</button>

              <p className='stockInfo'>
                status:&#160;
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                  {product.stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
              <p className='outOfStockInfo'>{stockAlert}</p>
              <h4 className="mt-5">Product Details</h4>
              <span>{product.description}</span>
              <div>
              <button onClick={submitReviewToggle} className="submitreview-btn">Submit Review</button>
              </div>
            </div>
          </div>
        </section>

        <p className='reviewHeading'>Reviews</p>

        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

        {product.Reviews && product.Reviews[0] ? (
          <section className='product-reviews'>
            {product.Reviews &&
              product.Reviews.map((review) => <ReviewCard review={review} />)}
          </section>
        ) : (
          <p className='noReviews'>No Reviews Yet</p>
        )}

      </div>)}
    </Fragment>
  )
}

export default ProductDetail
