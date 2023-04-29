import React from "react";

const Management = () => {
  // const Management = () => {
  //   const [users, setUsers] = useState([]);

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");

  //     fetch("/users", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => setUsers(data))
  //       .catch((error) => console.error(error));
  //   }, []);
  // };

  return (
    <div>
      <h1>用户管理页面</h1>
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
