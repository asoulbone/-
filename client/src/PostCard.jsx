import React, { useState } from "react";
import "./postCard.css";

const PostCard = ({ posts }) => {
  const [likes, setLikes] = useState({});
  const userId = localStorage.getItem("userId"); // 从localStorage中获取userID

  const handleLike = (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: (prevLikes[postId] || 0) + 1,
    }));
  };

  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");

  const handleComment = (postId) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), newComment],
    }));
    setNewComment("");
  };

  return (
    <div className="postCardContainer">
      {posts &&
        posts.map((post) => {
          const postId = post.id;
          const postLikes = likes[postId] || 0;
          const postComments = comments[postId] || [];

          return (
            <div className="postCard" key={postId}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <img src={post.image_url} alt="Post" />
              <p>{post.date}</p>

              <button onClick={() => handleLike(postId)}>点赞 ({postLikes})</button>

              <div>
                <button onClick={() => handleComment(postId)}>评论</button>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment"
                />
              </div>

              {postComments.length > 0 && (
                <div>
                  <p>{`Total comments: ${postComments.length}`}</p>
                  {postComments.map((comment, index) => (
                    <p key={index}>{userId}:d{comment}</p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default PostCard;