import React from "react";
import "./container.css";
import PostCard from "./PostCard";
import { useState, useEffect } from "react";

const ImageTotal = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_post", {
      method: "GET",
      headers: {
        "Content-Type": "applications/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setPosts(resp))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <h1>Hi~参观一下大家的照片吧~</h1>
      <PostCard posts={posts} />
    </main>
  );
};

export default ImageTotal;
