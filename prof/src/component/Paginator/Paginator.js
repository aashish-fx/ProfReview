import React from 'react';
import './Paginator.css';

const Paginator = (props)=>{
    return (
        <div className="paginator">
            {props.children}
            
        </div>
    );
};
export default Paginator;