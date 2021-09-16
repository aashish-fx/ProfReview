import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Modal from '../Modal/Modal';
const errorHandler = (props)=>{
  return (
  <React.Fragment>
      {props.error && <Backdrop onClick={props.onHandle}/>}
       {props.error && (
        <Modal 
        title="An Error Occured"
          onCancelModel={props.onHandle}
          onAcceptModal = {props.onHandle}
          acceptEnabled
          >
            <p>{props.error.message}</p>     
          </Modal>
        )}
  </React.Fragment>
  );

}
export default errorHandler;