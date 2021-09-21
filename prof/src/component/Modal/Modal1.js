import React from 'react';
import ReactDOM from 'react-dom';
import './Modal1.css';
import { Link } from 'react-router-dom';
const modal1 = (props)=>{
    return (
    ReactDOM.createPortal(
    <div className="modal">
        <header className="modal_header">
            <h1>Login to continue</h1>
        </header>
        
        <div className="modal_actions">
            <Link to="/login"><button className="modal_btn__1">Login</button></Link>
        </div>    
               
        <div className="modal_actions1">        
            <Link to="/signup"><button className= "modal_btn__2">Create Account</button></Link>
        </div>
    </div>
    ,document.getElementById('modal-root'))
    );
}
export default modal1;