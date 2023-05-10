import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./management.css";

const Management = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const userId = localStorage.getItem("userId"); // 从localStorage中获取userID

  useEffect(() => {
    if (!userId) {
      // User is not logged in, handle the case here
      return;
    }

    axios
      .get(`http://127.0.0.1:5000/user_info/${userId}/`)
      .then((response) => {
        setUserInfo(response.data); // 从后端API获取用户信息并存储在userInfo中
      })
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value.toString() });
  };

  const handleSaveButtonClick = () => {
    console.log(userInfo);
    axios
      .put(
        `http://127.0.0.1:5000/update_user/${userId}/`,
        JSON.stringify(userInfo),
        {
          headers: {
            "Content-Type": "application/json",
          },
          // 禁用 Cors 预检，用于避免浏览器 CORS 机制导致的问题
          // 更多信息请参考 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS
          withCredentials: true,
        }
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));

    setIsEditing(false);
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  if (!userId) {
    return <div className="alertUnlogin">You are not logged in.</div>; // Display a message if userId is not available (user not logged in)
  }

  return (
    <div className="Container3">
      <table className="user-info">
        <tbody>
          <tr>
            <td className="inputBox">昵称</td>
            {isEditing ? (
              <td className="displayBox">
                <input
                  type="text"
                  name="userName"
                  value={userInfo.userName}
                  onChange={handleInputChange}
                />
              </td>
            ) : (
              <td className="displayBox">{userInfo.userName}</td>
            )}
          </tr>
          <tr>
            <td className="inputBox">密码 </td>
            {isEditing ? (
              <td className="displayBox">
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={userInfo.password}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                  <button
                    className="eyes"
                    onClick={handlePasswordVisibilityToggle}
                  >
                    {showPassword ? (
                      <ion-icon name="eye"></ion-icon>
                    ) : (
                      <ion-icon name="eye-off"></ion-icon>
                    )}
                  </button>
                </div>
              </td>
            ) : (
              <td className="displayBox">*********</td>
            )}
          </tr>
          <tr>
            <td className="inputBox">邮箱 </td>
            {isEditing ? (
              <td className="displayBox">
                <input
                  type="text"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                />
              </td>
            ) : (
              <td className="displayBox">{userInfo.email}</td>
            )}
          </tr>
          <tr>
            <td className="inputBox">手机 </td>
            {isEditing ? (
              <td className="displayBox">
                <input
                  type="text"
                  name="tel"
                  value={userInfo.tel}
                  onChange={handleInputChange}
                />
              </td>
            ) : (
              <td className="displayBox">{userInfo.tel}</td>
            )}
          </tr>
          <tr>
            <td className="inputBox">介绍 </td>
            {isEditing ? (
              <td className="displayBox">
                <input
                  type="text"
                  name="introduce"
                  value={userInfo.introduce}
                  onChange={handleInputChange}
                />
              </td>
            ) : (
              <td className="displayBox">{userInfo.introduce}</td>
            )}
          </tr>
        </tbody>
      </table>
      {isEditing ? (
        <button className="controlBtn" onClick={handleSaveButtonClick}>
          保存
        </button>
      ) : (
        <button className="controlBtn" onClick={() => setIsEditing(true)}>
          修改
        </button>
      )}
    </div>
  );
};

export default Management;
