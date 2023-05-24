import React from "react";
import "./container.css";
import InputImage from "./InputImage";
import OutImage from "./OutImage";
import { useState } from "react";
import axios from "axios";

const Container = () => {
  const [imageURL, setImageURL] = useState(null);

  const [fileName, setFileName] = useState("没有选择的图片");

  const [file, setFile] = useState(null);

  const [processedImage, setProcessedImage] = useState(null);

  const handleChangeSex = async () => {
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/process_image",
        formData,
        {
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([response.data], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeAge = async () => {
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/process_image_age",
        formData,
        {
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([response.data], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeAnime = async () => {
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/process_image_anime",
        formData,
        {
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([response.data], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Container">
      <div className="canvas">
        <InputImage
          imageURL={imageURL}
          setImageURL={setImageURL}
          fileName={fileName}
          setFileName={setFileName}
          handleChangeSex={handleChangeSex}
          handleChangeAge={handleChangeAge}
          handleChangeAnime={handleChangeAnime}
          file={file}
          setFile={setFile}
          setProcessedImage={setProcessedImage}
        />
      </div>
      <div className="canvas">
        <OutImage processedImage={processedImage} />
      </div>
    </div>
  );
};

export default Container;
