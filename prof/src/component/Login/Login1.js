import React from 'react';
import {Link} from 'react-router-dom';
import './Login1.css';
import { useHistory } from 'react-router-dom';
import useInput from '../../Hooks/use-input';
import {GoogleLogin} from 'react-google-login';
const Login1 = (props)=>{
    const history = useHistory();
    const {value:enteredEmail,
        isValid:enteredEmailIsValid,
         hasError:emailHasError,
         valueChangeHandler:emailChangeHandler,
         inputBlurHandler:emailBlurHandler,
         reset:resetEmailInput} = useInput((value)=>value.includes('@'));  

    const {value:enteredPassword,
            isValid:enteredPasswordIsValid,
            hasError:passwordHasError,
            valueChangeHandler:passwordChangeHandler,
            inputBlurHandler:passwordBlurHandler,
            reset:resetPasswordInput} = useInput((value)=>value.trim().length>=6);
    const formChangeHandler = (event)=>{
           event.preventDefault();
           props.onLogin(event,{email:enteredEmail,password:enteredPassword})   
           
           //resetEmailInput();
           //resetPasswordInput();
        }
        const handleLogin = (res)=>{
      
            props.google(res);
      
      
          }    
        const inputEmailClass = emailHasError ?'form-control invalid': 'form-control';
        const inputPasswordClass = passwordHasError ? 'form-control invalid': 'form-control';             
   return (
       <div className="login1-Container">
           <div className="login1Header">
             <span>ProfReview</span>
           </div>
           <div className="login1FormContainer">
               <div className="login1Form">
                   <form onSubmit={formChangeHandler}>
                        <GoogleLogin
                            clientId="224215270537-dtgav02548e8bbrlbltujslkf9c504o9.apps.googleusercontent.com"
                            buttonText="Log in with Google"
                            
                            onSuccess={handleLogin}
                            onFailure={handleLogin}
                            cookiePolicy={'single_host_origin'}
                            className = "login1google1"
                        />
                        <div className="login1Text"><span>Have a Password? Continue with your email address</span></div>
                        <div className="login1FormFill">
                            <span>Email</span>
                            <input type="text"  value={enteredEmail} onBlur={emailBlurHandler} name="email"  onChange={emailChangeHandler} className={inputEmailClass}></input>
                            {emailHasError && <p className='error-text'>Please enter a valid e-mail</p>}
                            <span>Password</span>
                            <input type="password" name="password" value={enteredPassword} onBlur={passwordBlurHandler} onChange={passwordChangeHandler} ></input>
                            {passwordHasError && <p className='error-text'>Password must be of length greater than 8</p>}

                            <button type="submit">Continue</button>
                            <span className="span1"><a href="/"><Link to="/reset-password">Forget password?</Link></a></span>
                        </div>
                        
                   </form>
               </div>
           </div>
       </div>
   );
};
export default Login1;