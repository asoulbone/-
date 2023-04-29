import React from "react";

const InputBox = ({ inputType, iconName, title, name, handleChange }) => {
  return (
    <div className="input-box">
      <span className="icon">
        <ion-icon name={iconName}></ion-icon>
      </span>
      <input type={inputType} name={name} required onChange={handleChange} />
      <label>{title}</label>
    </div>
  );
};

export default InputBox;
