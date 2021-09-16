import React from 'react';
import './Policy.css';
import Footer from '../Footer/Footer';
const Policy = ()=>{
  return (
      <div className="privacyContainer">
          <p className="privacyp1">ProfReview</p>
          
        <div className="privacyName">
            <p>Privacy Policy</p>
        </div>
        <div className="privacyContent">
           <div className="privacyText">Privacy Policy</div>
           <div className="privacyPara">
               <h2>Our Privacy Commitment</h2>   
               <p>We are committed to being open and transparent about how we manage your personal information.
                <br></br>
                <br></br>
                Our Privacy Policy aims to communicate, in the clearest way possible, how we treat your personal information.
                 We encourage you to read this Privacy Policy carefully. It will help you make informed decisions about sharing
                 your personal information with us.
               <br></br>
               <br></br>
               <br></br>
               At ProfReview we have a few fundamental principles:
               <br></br>
               <br></br>
                - We will always collect, store, use and disclose personal information in accordance with all applicable privacy laws. However,
                 we have also put in place this Privacy Policy to protect personal information you submit or we collect.
                <br></br>
                <br></br>
                - We will only use your personal information when it is necessary for us to deliver you our services or perform other necessary
                 business functions and activities.
                <br></br>
                <br></br>
                - We will not use or disclose your personal information for purposes unrelated to our business activities and the services we provide,
                 unless we first obtain your consent.
                </p> 
            </div>
        </div>
        <div className="privacyFooter">
         <Footer></Footer>
         </div>
      </div>
  );
};
export default Policy;