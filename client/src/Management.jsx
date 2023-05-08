import React from "react";
import { useState, useEffect } from "react";
import "./management.css";

const Management = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    fetch("http://127.0.0.1:5000/user_info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>个人信息</h1>
      <div className="postCardContainer">
        
      </div>
      {/* <ul>
        {users.map((user) => {
          <li key={user.id}>
            {user.userName}({user.email})
          </li>;
        })}
      </ul> */}
    </div>
  );
};

export default Management;
