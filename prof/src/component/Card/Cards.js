import React from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';
import arun from '../ContactUs/Template/images/Dr. Arun Cyril Jose.jpg';
import Bakkya from '../ContactUs/Template/images/Dr. Bakkyaraj T.jpg';
import Victer from '../ContactUs/Template/images/Dr. P. Victer Paul.jpg';
const Cards = ()=>{
   return (
       <div className='card-container'>
       <div className='card first'>
         <div className='card-sidebar'>
             <img className='profile-image' src={arun} alt="h"></img>
         </div>
         <div className='card-main'>
             <h1 className='profile-name'>Arun Cyril</h1>
             <p className='profile-position'>Researche Faculty</p>
             <p className='profile-body'>I am looking for determined, motivated and hardworking PhD students who 
             like to work on research side and contribute to the knowledge. Interested students can contact me via email or telephone.
               </p>
               <Link to="6140e5d679a393369800890e">
             <a href='/' className='profile-link'>for details<i class="fa fa-external-link"  aria-hidden="true"></i></a>  
             </Link>
         </div>
         </div>
         <div className='card second'>
         <div className='card-sidebar'>
             <img className='profile-image' src={Bakkya} alt=''></img>
         </div>
         <div className='card-main'>
             <h1 className='profile-name'>Dr. Bakkyaraj T</h1>
             <p className='profile-position'>Researche Faculty</p>
             <p className='profile-body'>My broad field of research is nonlinear differential equations. Recently my work is focussed on dynamical
              systems governed by nonlinear fractional differential and differential - difference equations.
               </p>
               <Link to="6142ed78da15434e486d514a">
             <a href='/' className='profile-link'>for details<i class="fa fa-external-link"  aria-hidden="true"></i></a>
             </Link>  
         </div>
         </div>
         <div className='card third'>
         <div className='card-sidebar'>
             <img className='profile-image' src={Victer} alt=''></img>
         </div>
         <div className='card-main'>
             <h1 className='profile-name'>Dr. P. Victer</h1>
             <p className='profile-position'>Researche Faculty</p>
             <p className='profile-body'>DR. P. Victer Paul is working in the fields of Optimization 
             algorithms, Cloud Computing and Data Analytics.
               </p>
               <Link to="6142eea1da15434e486d5150">
             <a href='/' className='profile-link'>for details<i class="fa fa-external-link"  aria-hidden="true"></i></a>  
             </Link>         
         </div>
       </div>
       </div>
       
       
   );
};
export default Cards;