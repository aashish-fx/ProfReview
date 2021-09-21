import React from 'react';
import './AboutUs.css';
import Footer from '../Footer/Footer';
const AboutUs = ()=>{
   return (
       <React.Fragment>
            <div className="aboutUsUpperBody">
               <div className="aboutUsText">
                  <span>AboutUs</span>
               </div>
            </div>
           
                <div className="aboutUsspan">
                    <span className="as1">
                        ProfReview is a non-profit company which helps research 
                        students to find best faculty for their research work. 
                    </span>
                    <div className='aboutuslogo'>
                        <span className='aboutuslogo1'>Prof</span>
                        <span className='aboutuslogo2'>Review</span>
                    </div>
                </div>
               <div className="aboutUsLowerBody">
                  <span>Our Team </span> 
                  <br></br>
                  <div className="aboutUsContent">
                        <div className="aboutUsAshish">
                            <p>Aashish Sharma</p>
                            <ul>
                                <li><i class="fa fa-graduation-cap" aria-hidden="true"></i>IIIT KOTTAYAM</li>
                                <li>Full Stack Developer</li>
                            </ul>
                            <br></br>
                            <div className="AshishInfo">
                                <p>I have worked  on Front End part and Authentication part of this website</p>
                                <ul>
                                    <li><i class="fa fa-linkedin-square" aria-hidden="true"></i></li>
                                    
                                    <li><i class="fa fa-github" aria-hidden="true" ></i></li>
                                </ul>
                            </div>
                            
                        </div>
                     </div>
                     </div>
                     <div className="aboutUsLowerBody1">
                        <div className="aboutUsContent1">
                                <div className="aboutUsAshish">
                                    <p>Abhimanyu Kumbhar</p>
                                    <ul>
                                        <li><i class="fa fa-graduation-cap" aria-hidden="true"></i>IIIT KOTTAYAM</li>
                                        <li>Full Stack Developer</li>
                                    </ul>
                                    <br></br>
                                    <div className="AshishInfo">
                                        <p>I have worked  on Front End part and Authentication part of this website</p>
                                        <ul>
                                            <li><i class="fa fa-linkedin-square" aria-hidden="true"></i></li>
                                            <li><i class="fa fa-github" aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                     </div>
                     <div className="aboutUsLowerBody2">
                        <div className="aboutUsContent2">
                                <div className="aboutUsAshish">
                                    <p>Jeetesh Gavande</p>
                                    <ul>
                                        <li><i class="fa fa-graduation-cap" aria-hidden="true"></i>IIIT KOTTAYAM</li>
                                        <li>Full Stack Developer</li>
                                    </ul>
                                    <br></br>
                                    <div className="AshishInfo">
                                        <p>I have worked  on Front End part and Authentication part of this website</p>
                                        <ul>
                                            <li><i class="fa fa-linkedin-square" aria-hidden="true"></i></li>
                                            <li><i class="fa fa-github" aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
               </div>

               <div className="aboutUsfooter">
                  <Footer/>
                </div>   
          

       </React.Fragment>
       

   );
};
export default AboutUs;