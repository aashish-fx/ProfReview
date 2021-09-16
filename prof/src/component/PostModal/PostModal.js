import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Modal2 from '../Modal/Modal2';
const PostModal = (props)=>{
    return (
     <React.Fragment>
         <Backdrop/>
        <Modal2  handle = {props.backToHome}/>
     </React.Fragment>
    );
}
export default PostModal;