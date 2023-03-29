import { useState } from "react";
import LoginBox from "./LoginBox";
import Register from "./Register";
import { Link, Route, Routes } from "react-router-dom";
import ImageTotal from "./ImageTotal";
import FaceEdit from "./FaceEdit";
import About from "./About";
import Missing from "./Missing";
import PostPage from "./PostPage";
import PhotoDecoration from "./PhotoDecoration";
import Management from "./Management";
import Layout from "./Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<LoginBox />} />
        <Route path="register" element={<Register />} />
        <Route path="manage" element={<Management />} />
        <Route path="face-edit" element={<FaceEdit />} />
        <Route path="decoration" element={<PhotoDecoration />} />
        <Route path="post" element={<PostPage />} />
        <Route path="images" element={<ImageTotal />} />
        <Route path="about" element={<About />} />
        <Route path="missing" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
