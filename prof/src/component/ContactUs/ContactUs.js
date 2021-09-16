import React,{useState} from 'react';
import './contactUs.css';
import Footer from '../Footer/Footer';

import LoginModal from '../LoginModal/LoginModal';

//import Header from '../Header/Header';
const ContactUs = (props)=>{
  const [firstName,setfirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [contact,setContact] = useState('');
  const [message,setMessage] = useState('');
  const [login,setLogin] = useState(true);
  const firstNameChangeHandler = (event)=>{
      setfirstName(event.target.value);
  }
  const lastNameChangeHandler = (event)=>{
    setLastName(event.target.value);
  }
  const emailChangeHandler = (event)=>{
    setEmail(event.target.value);
  }
  const contactChangeHandler = (event)=>{
    setContact(event.target.value);
  }
  const messageChangeHandler = (event)=>{
    setMessage(event.target.value);
  }
  const contactFormHandler = (event)=>{
      event.preventDefault();
      
      if(props.isAuth===true)
      {  
          setLogin(true);
          props.onContactFormSubmit(event,{firstName:firstName,lastName:lastName,email:email,contact:contact,message:message});
      }
      else{
        setLogin(false);
      }
  }
    return (
      <div className="contactPage">
          <p className="contactFormp1">ProfReview</p>
        <div className="contactText">
          <p>Get in touch with us</p>
          </div>
        <div className='contactContainer'>
            <div className="contactName">Please complete your details and we will be in contact soon.</div>
          <div className="contactform" >
            <h2>Send a Message</h2>
            <form onSubmit={contactFormHandler}>
            <div className="formBox">
              
                  <div className='inputBox w1'>
                    <input type="text" onChange={firstNameChangeHandler} value={firstName} required/>
                        <span>First Name</span>
                  
                  </div>
                  <div className='inputBox w1'>
                    <input type="text" onChange={lastNameChangeHandler} value={lastName} required/>
                        <span>Last Name</span>
                  </div>
                  <div className='inputBox w1'>
                    <input type="email" onChange={emailChangeHandler} value={email} required/>
                        <span>email Address</span>
                  </div>
      
                  <div className='inputBox w1'>
                    <input type="number" onChange={contactChangeHandler} value={contact} required/>
                        <span>Contact No.</span>
                  </div>
                  <div className='inputBox w2'>
                    <textarea required onChange={messageChangeHandler} value={message}></textarea>
                        <span>Write your message...</span>
                  </div>
                  <div className='inputBox w2'>
                    {!login && 
                      <LoginModal/>
                    }
                     <input type="submit" value="send" >
                      </input>
                  </div>
                  </div>
              </form>
            
          </div>
          
        </div>
        <div className="contactFormFotter">
        <Footer/>
        </div>
        </div>
    );

};
export default ContactUs;