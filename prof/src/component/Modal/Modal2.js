import React from 'react';
import ReactDOM from 'react-dom';
import './Modal1.css';
import { Link } from 'react-router-dom';
const modal = (props)=>{
    const onClickHandler = ()=>{
        props.handle();
    }
    return (
    ReactDOM.createPortal(
    <div className="modal">
        <header className="modal_header">
            <h1>Post successfully created!</h1>
        </header>
        
        <div className="modal_actions">
            <Link to="/"><button className="modal_btn__1" onClick={onClickHandler}>Click to Home  <i class="fa fa-arrow-right" aria-hidden="true"></i></button></Link>
                
        </div>
    </div>
    ,document.getElementById('modal-root'))
    );
}
export default modal;