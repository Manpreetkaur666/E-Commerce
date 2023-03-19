import './App.css';
import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/layout/Header/Header.js'
import { Footer } from './components/layout/Footer/Footer';
import { Home } from './components/Home/Home';
import ProductDetail from './components/Product/ProductDetail';
import Products from './components/Product/Products';
import Search from './components/Product/Search'
import Auth from './components/User/Auth';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';
import { loadUser } from './actions/authAction';
import { useSelector, useDispatch } from 'react-redux';
import store from './store'
import UserOptions from './components/layout/Header/UserOptions';
import './components/layout/Header/Header.css'
import Profile from './components/User/Profile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';
import OrderSuccess from './components/Cart/OrderSuccess'
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails'
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList'


function App() {

  const dispatch = useDispatch();

  const NotifyOptions = {
    title: "Wonderful!",
    message: "Login Successfull",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: true
    }
  }

  const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

    const link = "http://localhost:5000/api/v1/stripeapikey";
    const {data} = await axios.get(link,
      config);

     setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    //Use loadUser in useEffect so that whenever we open website loggind user profile get fetched.
    store.dispatch(loadUser());

    getStripeApiKey();
  }, [])
  
  
  return (
    <BrowserRouter>
      <Header user ={ user }/>
      {/* <AlertProvider template={AlertTemplate} {...options} /> */}
      <ReactNotifications options={NotifyOptions}/>
      { isAuthenticated && <UserOptions user ={ user }/>}
      <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/product/:id" element={<ProductDetail/>} />
            <Route exact path="/products" element={<Products />} />
            <Route path="/search/products/:keyword" element={<Products />} />
            <Route exact path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route exact path="/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
            <Route exact path="/login" element={<Auth/>} />
            <Route exact path="/cart" element={<Cart />}/>
            <Route exact path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
            <Route exact path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
            {/* <Route exact path="/process/payment" element={<Payment />} /> */}
            {stripeApiKey && (
            <Route exact path="/process/payment" element={
              <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute><Payment /></ProtectedRoute>
              </Elements>
            } />
            )}

            <Route exact path="/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
            <Route exact path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
            <Route exact path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
            <Route exact path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
            <Route exact path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} />
            
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
