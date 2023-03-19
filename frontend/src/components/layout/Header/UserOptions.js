import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/authAction';
import Backdrop from '@mui/material/Backdrop';
import './Header.css'

const UserOptions = ({ user }) => {
     
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)

    const options = [
      { icon : <ListAltIcon />, name: "Orders", func: orders},
      { icon : <PersonIcon />, name: "Profile", func: account},
      { icon : <ExitToAppIcon />, name: "Logout", func: logoutUser}
    ];

    if(user.role==="admin"){
      //The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
      options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard})
    }

    function dashboard(){
      navigate("admin/dashboard");
    }

    function orders() {
      navigate("/orders");
    }

    function account(){
      navigate("/account");
    }

    function logoutUser(){
      dispatch(logout());
      console.log("logout successfully!")
      // alert.success("logout successfully");
      // navigate("/login");
    }

  return (
    <Fragment>
        <Backdrop open={open}/>
        <SpeedDial 
        className='speedDial'
        ariaLabel="speeddial toolkit"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
            <img
            className='speedDialIcon'
            src={user.avatar.url ? user.avatar.url : "/logo192.png"}
            alt="Profile"/>
        }>
        {options.map((item) => (<SpeedDialAction 
        className='speedDialAction' 
        key={item.name} 
        icon={item.icon} 
        tooltipTitle={item.name} 
        onClick={item.func}/>))}
        </SpeedDial>
       
    </Fragment>
  )
}

export default UserOptions
