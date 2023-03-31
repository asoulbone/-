import React from "react";
import "./inputImage.css";

const OutImage = ({ processedImage }) => {
  return (
    <section>
      <div className="imageinput">
        {processedImage ? (
          <img src={processedImage} width={100} height={100} />
        ) : (
          <label>Loading</label>
        )}
      </div>
    </section>
  );
};

export default OutImage;
