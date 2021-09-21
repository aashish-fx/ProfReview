import React,{useState,useRef} from 'react';
import './ProfileDropDown.css';
import {Link} from 'react-router-dom';
import profileImage from '../ContactUs/Template/images/profileImage.png'
const ProfileDropDown = (props)=>{
    const showProfile = useRef();
    const url = props.url
    console.log(url,"url");
    let image = ""
    if(url!==null){
      console.log(url);
      image = url;
    }
    else{
      image = profileImage;
    }
    const userName  = localStorage.getItem("userName");
    const profileHandler = ()=>{
        console.log(showProfile.current);
        showProfile.current.classList.toggle('active');
    }
      return(
          <div className="dropdown-container">
              <div className="dropdown-profile"  onClick={profileHandler}>
                <img src={image} alt="user"></img>
              </div>
              <div className="dropdown-menu " ref={showProfile} >
                <h3>{userName}</h3>
                
                <ul>
                   <Link to="/profile"> <li>Profile</li></Link>
                    <Link to="/dashboard"><li>Dashboard</li></Link>
                    <Link to="/create-post"><li>Create Post</li></Link>
                    <li onClick={props.onLogout}>Logout</li>

                </ul>
              </div>
          </div>
      );
};
export default ProfileDropDown;

/*

*/