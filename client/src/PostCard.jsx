import React from "react";
import "./postCard.css";

const PostCard = ({ posts }) => {
  return (
    <div className="postCardContainer">
      {posts &&
        posts.map((post) => {
          return (
            <div className="postCard" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <img src={post.image_url} />
              <p>{post.date}</p>
            </div>
          );
        })}
      ;
    </div>
  );
};

export default PostCard;
