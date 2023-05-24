import React, { useEffect, useRef, useState } from "react";
import "./photo.css";

const PhotoDecoration = () => {
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [invert, setInvert] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(1);
  const [flipVertical, setFlipVertical] = useState(1);

  const fileInput = useRef(null);
  const previewImg = useRef(null);
  const containerRef = useRef(null);
  const [activeOption, setActiveOption] = useState(null);
  const options = [
    { id: 1, label: "亮度" },
    { id: 2, label: "饱和度" },
    { id: 3, label: "反转颜色" },
    { id: 4, label: "灰度" },
  ];
  const rotates = [
    { id: 1, label: "fa-solid fa-rotate-left" },
    { id: 2, label: "fa-solid fa-rotate-right" },
    { id: 3, label: "bx bx-reflect-vertical" },
    { id: 4, label: "bx bx-reflect-horizontal" },
  ];
  const filterNameRef = useRef(null);
  const filterSlider = useRef(null);
  const filterValue = useRef(null);

  useEffect(() => {
    previewImg.current.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
    previewImg.current.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${invert}%) grayscale(${grayscale}%)`;
  }, [
    brightness,
    saturation,
    invert,
    grayscale,
    rotate,
    flipHorizontal,
    flipVertical,
  ]);

  const handleOptionClick = (option) => {
    setActiveOption(option);
    filterNameRef.current.innerText = options[option - 1].label;

    switch (option) {
      case 1:
        filterSlider.current.max = 200;
        filterNameRef.current.innerText = "亮度";
        filterValue.current.innerText = `${brightness}%`;
        filterSlider.current.value = brightness;
        break;
      case 2:
        filterSlider.current.max = 200;
        filterNameRef.current.innerText = "饱和度";
        filterValue.current.innerText = `${saturation}%`;
        filterSlider.current.value = saturation;
        break;
      case 3:
        filterSlider.current.max = 100;
        filterNameRef.current.innerText = "反转颜色";
        filterValue.current.innerText = `${invert}%`;
        filterSlider.current.value = invert;
        break;
      case 4:
        filterSlider.current.max = 100;
        filterNameRef.current.innerText = "灰度";
        filterValue.current.innerText = `${grayscale}%`;
        filterSlider.current.value = grayscale;
        break;
      default:
        break;
    }
  };

  const handleChooseImgClick = () => {
    fileInput.current.click();
  };

  const handleLoadImg = () => {
    let file = fileInput.current.files[0];
    if (!file) return;
    previewImg.current.src = URL.createObjectURL(file);
    containerRef.current.classList.remove("disable");
  };

  const handleInput = () => {
    const value = filterSlider.current.value;

    switch (activeOption) {
      case 1:
        setBrightness(value);
        filterValue.current.innerText = `${value}%`;
        break;
      case 2:
        setSaturation(value);
        filterValue.current.innerText = `${value}%`;
        break;
      case 3:
        setInvert(value);
        filterValue.current.innerText = `${value}%`;
        break;
      case 4:
        setGrayscale(value);
        filterValue.current.innerText = `${value}%`;
        break;
      default:
        break;
    }
  };

  const handleRotateClick = (id) => {
    let r = rotate;
    let fh = flipHorizontal;
    let fv = flipVertical;
    switch (id) {
      case 1:
        r -= 90;
        setRotate(r);
        break;
      case 2:
        r += 90;
        setRotate(r);
        break;
      case 3:
        fh = fh === 1 ? -1 : 1;
        setFlipHorizontal(fh);
        break;
      case 4:
        fv = fv === 1 ? -1 : 1;
        setFlipVertical(fv);
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setBrightness(100);
    setSaturation(100);
    setInvert(0);
    setGrayscale(0);
    setRotate(0);
    setFlipHorizontal(1);
    setFlipVertical(1);
  };

  const handleSave = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.current.naturalWidth;
    canvas.height = previewImg.current.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${invert}%) grayscale(${grayscale}%)`;

    // 让他在中心位置
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // 如果rotate不为0，则跟着旋转画布
    if (rotate !== 0) {
      ctx.rotate((rotate * Math.PI) / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);

    ctx.drawImage(
      previewImg.current,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <main>
      <div className="container2 disable" ref={containerRef}>
        <h2>美化你的照片吧~</h2>
        <div className="wrapper2">
          <div className="editor-panel">
            <div className="filter">
              <label className="title">滤镜</label>
              <div className="options">
                {options.map((option) => (
                  <button
                    key={option.id}
                    className={activeOption === option.id ? "active" : ""}
                    onClick={() => handleOptionClick(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="slider">
                <div className="filter-info">
                  <p className="name" ref={filterNameRef}>
                    亮度
                  </p>
                  <p className="value" ref={filterValue}>
                    100%
                  </p>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  ref={filterSlider}
                  onInput={handleInput}
                />
              </div>
            </div>
            <div className="rotate">
              <label className="title">旋转</label>
              <div className="options">
                {rotates.map((rotate) => (
                  <button
                    key={rotate.id}
                    onClick={() => handleRotateClick(rotate.id)}
                  >
                    <i className={rotate.label}></i>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="preview-img">
            <img
              src="/image-placeholder.svg"
              alt="preview-img"
              ref={previewImg}
            />
          </div>
        </div>
        <div className="controls">
          <button className="reset-filter" onClick={handleReset}>
            重置滤镜
          </button>
          <div className="row">
            <input
              type="file"
              className="file-input"
              accept="image/*"
              ref={fileInput}
              hidden
              onChange={handleLoadImg}
            />
            <button className="choose-img" onClick={handleChooseImgClick}>
              选择图片
            </button>
            <button className="save-img" onClick={handleSave}>
              保存图片
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PhotoDecoration;
