import React, { Fragment, useEffect } from 'react'
import './Home.css'
import '../../App.css'
import { CgMouse } from "react-icons/cg"
import { Product } from './ProductCard'
import MetaData from '../layout/MetaData'
import { getProduct } from '../../actions/productAction'
import { useSelector, useDispatch } from "react-redux"
// import { bindActionCreators } from 'redux'
import Loader from '../layout/Loader/Loader'
import Brands from './Brands'
import Highlights from './Highlights'
import Banner from './Banner'
// import { getProductDetail } from '../../actions/productDetailAction';
// import productAction from '../../actions/productAction'



export const Home = () => {

  const dispatch = useDispatch();

  const { loading, error, products, productsCount } = useSelector((state) => state.products);

  // const { getProduct } = bindActionCreators(productAction, dispatch)

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        <MetaData title={"ManSe Shop"} />
        <section id="home">
          <div className="container">
            <h5>NEW ARRIVALS</h5>
            <h1 className='py-2'><span>Best Price</span>This Year</h1>
            <p>Shoomating offers your very comfortable time<br />on walking and exercises.</p>
            <a href='#featured'><button>Shop Now <CgMouse /></button></a>
          </div>
        </section>

        {/* Brand Section */}
        <Brands />

        {/* Brand Section */}
        <Highlights />

        {/* Featured Products */}
        <section id="featured" className="my-5 pb-5">
          <div className="container text-center mt-5 py-5">
            <h3 className='py-2'>Our Featured</h3>
            <hr className="mx-auto" />
            <p>Here you can check our new products at reasonable prices.</p>
          </div>
          <div className="product-container row mx-auto container-fluid">
            {products && products.slice(0,4).map(product => (<Product key={product._id} product={product}/>))}
          </div>
        </section>

        {/* Banner Section */}
        <Banner />

        {/* Clothes Products */}
        <section id="featured" className="my-5 pb-5">
          <div className="container text-center mt-5 py-5">
              <h3>Dress and Jumpsuits</h3>
              <hr class="mx-auto"/>
              <p>Here you can check our new producte at reasonable prices.</p>
          </div>
          <div className="product-container row mx-auto container-fluid">
            {products && products.slice(0,4).map(product => (<Product key={product._id} product={product}/>))}
          </div>
        </section>

      </Fragment>}
    </Fragment>
  )
}
