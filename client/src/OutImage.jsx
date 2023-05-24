import React from "react";
import "./inputImage.css";

const OutImage = ({ processedImage }) => {
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = processedImage;
    link.download = "processed_image.png";
    link.click();
  };

  return (
    <section>
      <div className="imageinput">
        {processedImage ? (
          <>
            <img src={processedImage} width={100} height={100} />
          </>
        ) 
        : (
          <label>Loading</label>
        )}
      </div>
      <div className="download">
        <button onClick={downloadImage}>保存图片</button>
      </div>
    </section>
  );
};

export default OutImage;
