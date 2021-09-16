import React from 'react';
import styles from './Modal.module.css';
import ReactDom from 'react-dom';
const Backdrop = ()=>{
    return <div className={styles.backdrop}></div>
}
const Modaloverlay = (props)=>{
    return <div className={styles.modal}>
       <div>{props.children}</div>
    </div>
} 
const portalEle = document.getElementById('overlay');
const Modal = (props)=>{
      return <div className={styles.full}>
          {ReactDom.createPortal(<Backdrop/>,portalEle)}
          {ReactDom.createPortal(<Modaloverlay>{props.children}</Modaloverlay>,portalEle)}
          </div>
}
export default Modal