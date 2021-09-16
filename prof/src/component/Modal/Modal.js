import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import Button from '../Button/Button';
const modal = (props)=>{
    return (
    ReactDOM.createPortal(
    <div className="modal">
        <header className="modal_header">
            <h1>{props.title}</h1>
        </header>
        <div className="modal_content">{props.children}</div>
        <div className="modal_actions">
          
            <Button mode="raised" onClick={props.onAcceptModal} disabled={!props.acceptEnabled} loading={props.isLoading}>Accept</Button>

        </div>
    </div>
    ,document.getElementById('modal-root'))
    );
}
export default modal;