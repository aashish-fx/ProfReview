import React,{ useState } from "react";
import  { Redirect } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import LoginModal from "../LoginModal/LoginModal";
import './Rating.css';
const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
};



function Rating(props) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [message,setMessage] = useState('');
  const [valid,setValid] = useState(true);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    if(!props.isAuth)
    {
      setValid(false);
    }
    else{
      setValid(true);
      setCurrentValue(value);
      console.log(value);
    }
    
 }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }
  const formSubmitHandler = (event)=>{
    event.preventDefault();
    props.rating(event,{message:message,currentValue:currentValue});
    console.log("hello");
    
  }
  const messageHandler = (event)=>{
      setMessage(event.target.value);

  }

  return (
    <React.Fragment>
        <div className="rating-conatiner">
        <div className="rating-star-container" ref={props.body}>
              <h2> Rate Us </h2>
        </div>
        <form onSubmit={formSubmitHandler} className="rating-form">
          <div className="rating-star-container">
          <div className="rating-star">
            {stars.map((_,index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                  style={{
                    marginRight: 10,
                    cursor: "pointer"
                  }}
                />
              )
            })}
          </div>
          </div>
          <div className="rating-star-container">
          <textarea
            placeholder="What's your experience?"
            className="rating-textArea"
            onChange={messageHandler}
            value={message}
            required
          />
          </div>
          <br></br>
          <div className="rating-star-container">
            <button
                type="submit"
                className="rating-btn"
            >
            Submit
          </button>
          </div>
          </form>
        </div>
        {!valid &&<LoginModal/>}
    </React.Fragment>
  );
};



export default Rating;
 