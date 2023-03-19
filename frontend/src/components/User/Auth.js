import React, { Fragment, useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { clearErrors, login, register } from '../../actions/authAction'
import {useNavigate} from 'react-router-dom';
import { Store } from 'react-notifications-component';
import './Auth.css';
// import { useAlert } from 'react-alert';


function Auth() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const alert = useAlert();

  const loginTab = useRef();
  const registerTab = useRef();
  const switcherTab = useRef();

  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

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

  const redirect = location.search ? location.search.split("=")[1] : "/products";
  console.log(location.search.split("=")[1]);
  
  useEffect(() => {
    if(error){
      // alert.show(error);
      Store.addNotification({ ...options,
        message:error,
        type: "danger"});  
      dispatch(clearErrors);
      console.log(error);
    }
    if(isAuthenticated){
      navigate(redirect)
    }
  }, [dispatch,error,navigate,isAuthenticated,redirect]);


  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {name , email, password} = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/logo192.png")

  
  
  const switchTabs = (e,tab) => {
     if(tab === 'login'){
         switcherTab.current.classList.add("shiftToNeutral");
         switcherTab.current.classList.remove("shiftToRight");

         registerTab.current.classList.remove("shiftToNeutralForm");
         loginTab.current.classList.remove("shiftToLeft");
     }
     if(tab === 'register'){
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
     }
  }

  /* Login */ 
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    // alert.show("successfully loggedin!");
  }

  /* Register */
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("password",password);
    myForm.set("avatar",avatar);
    dispatch(register(myForm));
    console.log("Register Successfull");
  }

  const registerDataChange = (e) => {
    if(e.target.name === "avatar"){
      const reader = new FileReader();
      
      reader.onload = () => {
        //has 3 states: 0- Empty 1-Loading 2-done
        if(reader.readyState === 2){
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);

    }else{
        setUser({ ...user, [e.target.name]: e.target.value});
    }
  }

  return (
    <Fragment>
      <div className='authContainer'>
           <div className='authBox'>
               <div>
                <div className='authToggleContainer'>
                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
               </div>
               <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                 <div className='loginEmail'>
                     <MailOutlineIcon className='mailIcon' />
                     <input
                     type="email"
                     placeholder="Email"
                     required
                     value={loginEmail}
                     onChange={(e) => setLoginEmail(e.target.value)}
                     /> 
                 </div>
                 <div className='loginPassword'>
                     <LockOpenIcon className='lockIcon' />
                     <input
                     type="password"
                     placeholder="password"
                     required
                     value={loginPassword}
                     onChange={(e) => setLoginPassword(e.target.value)}/>
                 </div>
                 <Link  to="/password/forgot">forgot password ?</Link>
                 <input type="submit" value="Login" className='loginBtn'/>
               </form>

                {/* signupForm */}
               <form className='signUpForm' ref={registerTab} encType="mutlipart/form-data" onSubmit={registerSubmit}>
                 <div className='signUpName'>
                     <FaceIcon />
                     <input
                     type="text"
                     placeholder="Name"
                     required
                     name="name"
                     value={name}
                     onChange={registerDataChange}
                     /> 
                 </div>
                 <div className='signUpEmail'>
                     <MailOutlineIcon />
                     <input
                     type="email"
                     placeholder="Email"
                     required
                     name="email"
                     value={email}
                     onChange={registerDataChange}
                     /> 
                 </div>
                 <div className='signUpPassword'>
                     <LockOpenIcon />
                     <input
                     type="password"
                     placeholder=""
                     required
                     name="password"
                     value={password}
                     onChange={registerDataChange}/>
                 </div>
                 <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                 <input 
                 type="submit" 
                 value="Register" 
                 className='signupBtn' 
                 />
               </form>
           </div>
      </div>
    </Fragment>
  )
}

export default Auth
