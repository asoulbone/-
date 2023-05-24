import React, { useState } from "react";
import axios from "axios";
import "./postPage.css";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [similarPosts, setSimilarPosts] = useState(null);
  const userId = localStorage.getItem("userId");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const selectedImage = e.target.files[0];
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("body", content);
    formData.append("image", image);

    console.log(formData);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/create_post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = res.data;
      console.log(data);
      setSimilarPosts(data);

      setMessage("Post created successfully!");
    } catch (error) {
      setMessage("An error occurred while creating the post.");
      console.error(error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleClose = () => {
    setSimilarPosts(null);
  };

  return (
    <main>
      <div className="postBG">
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

        {similarPosts && (
          <div className="popup">
            <h1>猜你喜欢~</h1>
            {similarPosts.map((similarPost) => {
              const postId = similarPost.id;

              return (
                <div className="orz">
                  <div className="ccard" key={postId}>
                    <h2>{similarPost.title}</h2>
                    <p>{similarPost.body}</p>
                    <img src={similarPost.image_url} />
                    <p>{similarPost.date}</p>
                  </div>
                </div>
              );
            })}
            <button onClick={handleClose}>关闭</button>
          </div>
        )}
      </div>
    </main>
  );
};

export default PostPage;
