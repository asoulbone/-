import React from "react";
import { useState } from "react";
import axios from 'axios'
import "./inputImage.css";

const InputImage = () => {
  const [image, setImage] = useState(null);

  const [fileName, setFileName] = useState("没有选择的图片");

  const [processedImage, setProcessedImage] = useState(null);

  const handleChangeSex=async ()=>{
    const formData=new FormData();
    formData.append('image',image)
    try{
        const response=await axios.post('/api/process_image',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            },
            responseType:'arraybuffer'
        })
        if(!response.ok) throw Error("Please reload")
        // Buffer 用于处理二进制数据文件
        setProcessedImage(Buffer.form(response.data).toString('base64'))
    }catch(err){
        console.error(err)
    }
  }

  return (
    <section>
      <form
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
              setImage(URL.createObjectURL(files[0]));
            }
          }}
        />

        {image ? (
          <img src={image} alt={fileName} />
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
