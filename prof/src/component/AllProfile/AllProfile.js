import React from "react";
import "./AllProfile.css";
import { Link } from "react-router-dom";
const AllProfile = (props) => {
  console.log(props.image);
  return (
    <div className="AllProfile">
      <div className="AllProfile_part1">
        <div className="AllProfile_img">
          <img
            src={`/uploads/${props.image}`}
            alt="..."
            width="150rem"
            height="150rem"
          ></img>
        </div>
        <div className="AllProfile_name">{props.name}</div>
      </div>
      <div className="AllProfile_part2">
        <p>College:{props.college}</p>
        <br></br>
        {props.breif}
        <br></br>
        <br></br>
        <br></br>
        <Link to={props.id}>
          <button>
            Click for details{" "}
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};
export default AllProfile;
