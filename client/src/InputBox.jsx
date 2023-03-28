import React from "react";

const InputBox = ({inputType,iconName,title}) => {
  return (
    <div className="input-box">
      <span className="icon">
        <ion-icon name={iconName}></ion-icon>
      </span>
      <input type={inputType} required />
      <label>{title}</label>
    </div>
  );
};

export default InputBox;
