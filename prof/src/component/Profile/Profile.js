import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import profileImage from '../ContactUs/Template/images/imageProfile.png'
const Profile = ()=>{
    const userName = localStorage.getItem('userName');
    let date = localStorage.getItem('date');
    date = date.substr(2,8);
    return (
        <div className="profile-container">
            <div className="profile-header"><Link to="/"><span>ProfReview</span></Link></div>
            <div className="profile-data">
                    <div className="profile-div">
                        <div className='profile-image-div'>
                            <img className='profile-image1' src={profileImage} alt=''></img>
                        </div>
                        <div className="profile-userName">
                            <span>{userName}</span>
                        </div>    
                        <div className="profile-userName1">
                        <i class="fa fa-calendar-check-o" aria-hidden="true"></i> <div className="profile-createdon">Joined on: {date}</div>   
                        </div>
                        <div className="profile-userName2">
                            <div className="profile-dashbord"><Link to="/dashboard/:userId"><button>Dashboard</button></Link></div>   
                        </div>
                    </div>
            </div>
            <Footer/>
        </div>
    );
};
export default Profile;