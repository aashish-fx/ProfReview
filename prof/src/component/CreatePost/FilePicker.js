import React from 'react';

const FilePicker = (props)=>{
    return(
        <div className="">
            <label htmlFor={props.id}>{props.label}</label>
            <input className=""  type="file"
             onChange={e=>props.onChange(props.id,e.target.value,e.target.files)} >
            </input>
        </div>
    );
}
export default FilePicker;