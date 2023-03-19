import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from "react-router-dom";
import { Product } from '../Home/ProductCard';
import { getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader';
import Pagination from "react-js-pagination";
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';
import Slider from '@material-ui/core/Slider';
import './Products.css'

const categories = [
  "Laptop",
  "Footwear",
  "Dress",
  "Watches",
  "Tops",
  "Jeans",
  "Clothing"
]

const Products = () => {
  const dispatch = useDispatch();

  let location = useLocation().pathname;

  const keyword = useParams().keyword;

  const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);

  let count = filteredProductsCount;
  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  //Category-filter
  const [category, setCategory] = useState("")
  // Rating-filter
  const [ratings, setRatings] = useState(0);
  const [hover, setHover] = useState(0);
 

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, category, ratings))
  }, [dispatch, keyword, location, currentPage, category, ratings]);



  return (
    <Fragment>
      {loading ? (<Loader />) : (<div><section id="featured" className="my-1 pb-3">
        <div className="container text-center mt-5 py-3">
          <h3 className='py-2'>Our Products</h3>
          <hr className="mx-auto" />
          <p>Here you can check our new products at reasonable prices.</p>
        </div>

        <div className='main-display'>
          <div className='filters'>
            {/* <div className='slider'>
            <label>Price:</label>
            <Box className='box' sx={{ width: 300}}>
              <Slider
                value={price}
                onChange={pricehandler}
                valueLabelDisplay="auto"
                aria-labelledby='range-slider'
                getAriaValueText={pricetext}
                min={0}
                max={25000}
              />
            </Box>
          </div> */}

            <div className='filter-Category'>
              <label>Categories:</label>
              <ul>
                {categories.map((category) => (
                  <li
                    className='category-link'
                    key={category}
                    onClick={() => { setCategory(category) }}>{category}</li>
                ))}
              </ul>
            </div>

            <div className='filter-rating'>
              <label>Customer Review:</label>
              <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className= {index <= (hover || ratings) ? "on" : "off"}
                      onClick={() => setRatings(index)}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(ratings)}
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="product-container row mx-auto container-fluid">
            {products && products.map(product => (<Product key={product._id} product={product} />))}
          </div>

        </div>

      </section>
      </div>)}

      {resultPerPage < productsCount && <div className='pagination-container'>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText="next >"
          prevPageText="< previous"
          firstPageText="1st"
          lastPageText="last"
          pageRangeDisplayed={2}
          itemClass='page-item'
          linkClass='page-link'
          activeClass='pageItemActive'
          activeLinkClass='pageLinkActive'
        />
      </div>}

    </Fragment >
  )
}

export default Products
