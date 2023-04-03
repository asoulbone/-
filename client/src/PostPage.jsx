import React from "react";
import PostCard from "./PostCard";
import "./postCard.css";
import "./container.css";

const PostPage = () => {
  return (
    <main>
      <div className="postCardContainer">
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
      </div>
    </main>
  );
};

export default PostPage;
