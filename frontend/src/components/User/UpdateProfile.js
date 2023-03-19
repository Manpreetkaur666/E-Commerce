import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import { clearErrors, loadUser, updateProfile } from '../../actions/authAction'
import { useNavigate } from 'react-router-dom';
import { Store } from 'react-notifications-component';
import './UpdateProfile.css';
import { UPDATE_PROFILE_RESET } from '../../constants/authConstants';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/logo192.png");

    /* Options for Alert*/
    const options = {
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

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            Store.addNotification({
                ...options,
                message: error,
                type: "danger"
            });
            dispatch(clearErrors);
            console.log(error);
        }
        if (isUpdated) {
            alert.success("Update successfully!");
            dispatch(loadUser());
            navigate('/account');
            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, navigate, isUpdated, user, alert]);


    /* updateProfile */
    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    }

    const updateProfileDataChange = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            //has 3 states: 0- Empty 1-Loading 2-done
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }


    return (
       <Fragment>
        {loading ? <Loader /> :  <Fragment>
            <MetaData title="Update Profile"/>
            <div className='updateProfileContainer'>
                <div className='updateProfileBox'>
                 <h2 className='updateProfileHeading'>Update Profile</h2>
                {/* signupForm */}
               <form className='updateProfileForm' encType="mutlipart/form-data" onSubmit={updateProfileSubmit}>
                 <div className='updateProfileName'>
                     <FaceIcon />
                     <input
                     type="text"
                     placeholder="Name"
                     required
                     name="name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     /> 
                 </div>
                 <div className='updateProfileEmail'>
                     <MailOutlineIcon />
                     <input
                     type="email"
                     placeholder="Email"
                     required
                     name="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     /> 
                 </div>
                 <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                 <input 
                 type="submit" 
                 value="Update" 
                 className='updateProfileBtn' 
                 />
               </form>
               </div>
            </div>
        </Fragment>}
       </Fragment>
    )
}

export default UpdateProfile