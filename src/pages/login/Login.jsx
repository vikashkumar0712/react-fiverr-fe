import "./Login.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newRequest } from "../../utils/request";
import constants from "../../common/constants";

export const Login = () => {
  // States management
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

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
      setIsLoading(true);
      const { data: response } = await newRequest.post(
        "/services/login",
        credentials
      );

      const currentUser = response.data.user;

      localStorage.setItem(
        constants.LOCAL_STORAGE.CURRENT_USER,
        JSON.stringify(currentUser)
      );

      toast.success(constants.SUCCESS_MESSAGES.USER_LOGGED_IN);
      setIsLoading(false);
      setTimeout(() => navigate(constants.ROUTES.HOME), 4000);
    } catch (error) {
      setIsLoading(false);
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">
          Email address or username <span>*</span>
        </label>
        <input
          name="username"
          type="text"
          placeholder="Email / Username"
          value={credentials.username}
          onChange={handleCredentials}
          required
        />

        <label htmlFor="">
          Password <span>*</span>
        </label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleCredentials}
          required
        />
        <button type="submit">{isLoading ? "Signing in..." : "Sign in"}</button>
      </form>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
