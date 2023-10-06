import React,{useEffect} from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import Search from '../../Product/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
// import SearchIcon from '@mui/icons-material/Search';
// import UserOptions from './UserOptions';
import { loadUser } from '../../../actions/authAction';
import { useSelector, useDispatch } from 'react-redux';
import store from './../../../store'
// import UserOptions from './components/layout/Header/UserOptions';



export const Header = () => {

	let total = 0;
   const dispatch = useDispatch();
   const { user, isAuthenticated } = useSelector((state) => state.user);

	// number of items in cart
   const { cartItems } = useSelector((state) => state.cart);

	// using forEach
	cartItems.forEach((item) => {
		total = total + item.quantity
	})

	// using for loop
//   for (let i=0 ; i < cartItems.length; i++){
//     total = total + cartItems[i].quantity
//   }

  useEffect(() => {
    //Use loadUser in useEffect so that whenever we open website loggind user profile get fetched.
    store.dispatch(loadUser());
  }, [dispatch])

    return (
        
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img className="logo" src="/images/logo/logo.png" alt="" />
                </a>
                <div>
                <Search />
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span><i id="bar" className="fa-solid fa-bars"></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/">Home</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="#">About</Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Contact Us</Link>
                    </li>
                    <li className="nav-item shoppingCart position-relative">
                        <Link className='nav-link' to="/cart"><ShoppingCartIcon />
								<span className="badge position-absolute translate-middle badge rounded-pill bg-danger">
                            {total}
                        </span></Link>
                    </li>   
                    <li className="nav-item">
                        <Link className='nav-link' to="/login"><PersonIcon /></Link>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;
