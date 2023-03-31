import React from "react";
import "./inputImage.css";

const InputImage = ({
  handleChangeSex,
  setFileName,
  setImageURL,
  setImage,
  imageURL,
  fileName,
  setFile,
  setProcessedImage,
}) => {
  return (
    <section>
      <form
        className="imageinput"
        onSubmit={(e) => e.preventDefault()}
        onClick={() => document.querySelector(".input-field").click()}
      >
        <input
          type="file"
          accept="image/*"
          className="input-field"
          hidden
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files) {
              setFile(files[0]);
              setImageURL(URL.createObjectURL(files[0]));
              setProcessedImage(null);
            }
          }}
        />

        {imageURL ? (
          <img src={imageURL} alt={fileName} />
        ) : (
          <>
            <span>
              <ion-icon name="cloud-upload" style={{ fontSize: 60 }}></ion-icon>
            </span>
            <p>上传您的人脸图片</p>
          </>
        )}
      </form>

      <section className="tips">
        <span>
          <ion-icon name="image"></ion-icon>
        </span>
        <span>
          {fileName}

          <span className="icon">
            <ion-icon
              name="trash"
              onClick={() => {
                setFileName("没有选择的图片");
                setImage(null);
              }}
            ></ion-icon>
          </span>
        </span>
      </section>

      <div className="select">
        <button onClick={handleChangeSex}>转换性别</button>
      </div>
    </section>
  );
};

export default InputImage;
