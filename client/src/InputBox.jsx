import React from "react";

const InputBox = ({ inputType, iconName, title, name, setFormData }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    if (name !== "confirmPassword") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

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
