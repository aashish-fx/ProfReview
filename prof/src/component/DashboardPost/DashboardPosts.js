import React from "react";
import { Link } from "react-router-dom";
import "./DashboardPosts.css";
import Button from "../Button/Button";

const DashboardPosts = (props) => {
  const id=props.id+"/post"
  const deletePostHandler = (event)=>{
    props.deletePostId(props.id);
  }
  return (
    <article className="dashboardPost">
      <header className="dashboardPost__header">
        <h3 className="dashboardPost__meta">
        </h3>
        <h1 className="post__title">{props.title}</h1>
      </header>
      <div className="post__actions">
        <Button mode="flat" onClick={deletePostHandler}>Delete</Button>
        <Link to={id}>
          <Button mode="flat">View</Button>
        </Link>
      </div>
    </article>
  );
};
export default DashboardPosts;
