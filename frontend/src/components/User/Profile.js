import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader';
import './Profile.css'

const Profile = () => {

    const navigate = useNavigate();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
      if(isAuthenticated === false){
        navigate("/login")
      }
    }, [isAuthenticated, navigate]);
    
  return (
    <Fragment>
        {loading ? <Loader /> : 
        <Fragment>
        <MetaData title={`${user.name}'s Profile`}/>
        <h1 className='profileHeading'>My Profile</h1>

        <div className='profileContainer'>
            <div className='profileIcon'> 
               <img src={user.avatar.url} alt={user.name}/>
                <Link to="/update">Edit Profile</Link>
            </div>

            <div className='profileInfo'>
                <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4>Joined on</h4>
                    <p>{String(user.createdAt).substring(0, 10)}</p>
                </div>
                <div className='update'>
                    <Link className="orderCheck" to="/orders">My Orders</Link>
                    <Link to="password/update">Change Password</Link>
                </div>
            </div>

        </div>
    </Fragment>}
    </Fragment>
  )
}

export default Profile
