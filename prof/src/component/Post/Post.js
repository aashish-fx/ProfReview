import React from "react";
import { Link } from "react-router-dom";
import "./post.css";
import Button from "../Button/Button";

const Post = (props) => {
  const id=props.id+"/post"
  return (
    <article className="post">
      <header className="post__header">
        <h3 className="post__meta">
          posted by {props.author}
          <br></br>
          {/* <span>{props.date}</span>  */}
        </h3>
        <h1 className="post__title">{props.title}</h1>
      </header>
      <div className="post__actions">
        <Link to={id}>
          <Button mode="flat">View</Button>
        </Link>
      </div>
    </article>
  );
};
export default Post;
