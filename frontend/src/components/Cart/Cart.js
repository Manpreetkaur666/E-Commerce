import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Cart.css';
import { addToCart, deleteFromCart } from '../../actions/cartAction';
import { useNavigate } from "react-router-dom";

const Cart = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	let total = 0;
	let subtotal = 0;
	

	const { cartItems } = useSelector((state) => state.cart);

	// using forEach
	cartItems.forEach((item) => {
		total = total + item.price;
		subtotal = subtotal + (item.price * item.quantity)
	});

	let tax = Math.round(0.13 * subtotal);


	const increaseQuantity = (productId, quantity, stock) => {
		  if(quantity < stock ){
				const qty = quantity + 1;
				dispatch(addToCart(productId, qty));
			}
			 console.log(quantity);
	}

	const decreaseQuantity = (productId, quantity) => {
		if(quantity > 1 ){
			const qty = quantity - 1;
			dispatch(addToCart(productId, qty));
		}
		 console.log(quantity);
	}

	const deleteItemHandler = (id) => {
       dispatch(deleteFromCart(id));
	}

	// navigate('/login?redirect=/shipping');

	const checkoutHandler = () => {
       navigate('/login?redirect=/shipping');
	}
	

	return (
		<Fragment>
			{cartItems.length === 0 
			? <div className='emptyCartSection'>
				<p>No Items in cart</p>
				<Link to={`/products`}><a>Shop Now</a></Link>
			</div> 
			: <Fragment>
			{/* <!------------------------------------Top Section-------------------------> */}

			<section id="blog" className="pt-3 mt-3 container">
				<h2 className="font-weight-bold mt-1 pt-1">Shopping Cart</h2>
				<hr />
			</section>

			<section id="cart-container" className="container my-5">
				<table width="100%">
					<thead>
						<tr>
							<td>Remove</td>
							<td>Image</td>
							<td>Product</td>
							<td>Price</td>
							<td>Quantity</td>
							<td>Total</td>
						</tr>
					</thead>

					<tbody>
							{cartItems && cartItems.map((item) => (
                <tr key={item.productId}>
								<td><a className='delete' onClick={() => deleteItemHandler(item.productId)}><i className="fas fa-trash-alt"></i></a></td>
								<td><Link to={`/product/${item.productId}`}>
									<img src={item.image} className="py-2" alt="" /></Link>
									</td>
								<td><p>{item.name}</p></td>
								<td><p>${item.price}</p></td>

								<td>
								<button className='minus' onClick={() => decreaseQuantity(item.productId, item.quantity)}>-</button>
                   <input className='quantityInput' readOnly type="number" value={item.quantity} />
                 <button className='plus' onClick={() => increaseQuantity(item.productId, item.quantity, item.stock)}>+</button>
									</td>

								<td><p>${`${item.price * item.quantity}`}</p></td>
							</tr>
							))}	
					</tbody>
				</table>
			</section>


			{/* <!------------------------------------Bottom Section-------------------------> */}


			<section id="bottom-cart" className="container">
				<div className="row">
					<div className="first-container col-lg-6 col-md-6 col-12">
						<div>
							<h5>COUPON</h5>
							<p>Enter your Coupon Code If You have one.</p>
							<input type="text" placeholder="Coupon Code" />
							<button className="uppercase-text inline-block">Apply Cuppon</button>
						</div>

					</div>

					<div className="second-container col-lg-6 col-md-6 col-12">
						<div>
							<h5>CART TOTAL</h5>
							<div className="d-flex justify-content-between">
								<h6>Subtotal</h6>
								<p>$ {subtotal}</p>
							</div>

							<div className="d-flex justify-content-between">
								<h6>Taxes</h6>
								<p>${tax}</p>
							</div>

							<hr className="cart-hr" />
								<div className="d-flex justify-content-between">
									<h6>Total</h6>
									<p>${subtotal + tax}</p>
								</div>

								<button className="text-uppercase checkoutBtn" onClick={() => checkoutHandler()}>Proceed to Checkout</button>
						</div>

					</div>

				</div>
			</section>
		</Fragment>}
		</Fragment>
	)
}

export default Cart