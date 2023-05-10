import React, { useState } from "react";
import axios from "axios";
import "./postPage.css";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("body", content);
    formData.append("image_url", imageUrl);

    console.log(formData);

    try {
      await axios.post("http://127.0.0.1:5000/create_post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Post created successfully!");
    } catch (error) {
      setMessage("An error occurred while creating the post.");
      console.error(error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <main>
      <div className="Container4">
        <h1>编写你的文章吧~</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>题目:</label>
            <input type="text" value={title} onChange={handleTitleChange} />
          </div>
          <div>
            <label>内容:</label>
            <textarea value={content} onChange={handleContentChange} />
          </div>
          <div className="image-container">
            <label>图片:</label>
            <input type="file" onChange={handleImageChange} />
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
          </div>
          <button type="submit">发布</button>
        </form>
        {message && (
          <div>
            <p>{message}</p>
            <button onClick={handleRefresh}>再发布一篇吧~</button>
          </div>
        )}
      </div>
    </main>
  );
};

export default PostPage;
