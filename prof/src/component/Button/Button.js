import React from 'react';

import './Button.css';

const button = (props)=>{
    return (
    <button className={['button',`button--${props.mode}`].join(' ')} 
        onClick = {props.onClick} disabled={props.disabled || props.loading}
        type={props.type}>
        {props.loading ? 'loading...': props.children}
    </button>
    );
}
export default button;
