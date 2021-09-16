import React,{useRef} from 'react';
import './ProfileDropDown.css';
import {Link} from 'react-router-dom';
import profileImage from '../ContactUs/Template/images/imageProfile.png'
const ProfileDropDown = (props)=>{
    const showProfile = useRef();
    const profileHandler = ()=>{
        console.log(showProfile.current);
        showProfile.current.classList.toggle('active');
    }
      return(
          <div className="dropdown-container">
              <div className="dropdown-profile"  onClick={profileHandler}>
                <img src={profileImage} alt="user"></img>
              </div>
              <div className="dropdown-menu " ref={showProfile} >
                <h3>{props.userName}</h3>
                
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