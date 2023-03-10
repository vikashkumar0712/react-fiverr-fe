import "./Login.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newRequest } from "../../utils/request";
import constants from "../../common/constants";

export const Login = () => {
  // States management
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Methods
  const handleCredentials = (e) => {
    const { name, value } = e.target;
    const handleChange = { ...credentials, [name]: value };
    setCredentials(handleChange);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await newRequest.post("/services/login", credentials);
      const currentUser = data.data.user;
      localStorage.setItem(
        constants.LOCAL_STORAGE.CURRENT_USER,
        JSON.stringify(currentUser)
      );
      navigate(constants.ROUTES.HOME);
    } catch (err) {
      console.log(err.response.data.error);
      setError(err.response.data.error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={handleCredentials}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleCredentials}
        />
        <button type="submit">Login</button>
      </form>
      {error && error}
    </div>
  );
};
