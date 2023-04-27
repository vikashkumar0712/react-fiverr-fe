import "./ForgotPassword.scss";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { newRequest } from "../../utils/request";
import constants from "../../common/constants";

export const ForgotPassword = () => {
  // States management
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "" });

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
        "/services/forgot-password",
        credentials
      );

      toast.success(response.data);
      navigate(constants.ROUTES.HOME);
    } catch (error) {
      setIsLoading(false);
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="forgot-password bg-animation">
      <div className="bg-1"></div>
      <div className="bg-2"></div>
      <div className="bg-3"></div>

      <form onSubmit={handleSubmit}>
        <div className="header">
          <label className="title">Forgot Password</label>
          <p className="description">
            Don&apos;t worry! It happens. Please enter the email <br />
            address associated with your account!
          </p>
        </div>

        <div className="input-container">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="m7 8.5 2.942 1.74c1.715 1.014 2.4 1.014 4.116 0L17 8.5"
              stroke="#141B34"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.016 13.476c.065 3.065.098 4.598 1.229 5.733 1.131 1.136 2.705 1.175 5.854 1.254 1.94.05 3.862.05 5.802 0 3.149-.079 4.723-.118 5.854-1.254 1.131-1.135 1.164-2.668 1.23-5.733.02-.986.02-1.966 0-2.952-.066-3.065-.099-4.598-1.23-5.733-1.131-1.136-2.705-1.175-5.854-1.254a115.11 115.11 0 0 0-5.802 0c-3.149.079-4.723.118-5.854 1.254-1.131 1.135-1.164 2.668-1.23 5.733a69.066 69.066 0 0 0 0 2.952Z"
              stroke="#141B34"
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
          </svg>
          <input
            className="input-field"
            name="email"
            type="text"
            placeholder="Enter your Email"
            value={credentials.email}
            onChange={handleCredentials}
            required
          />
        </div>

        <button className="io-button" type="submit">
          {isLoading ? (
            <>
              <svg
                aria-hidden="true"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50Zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0 0 41.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0 1 44.131 25.769c.902 2.34 3.361 3.802 5.787 3.165Z"
                  fill="currentColor"
                />
              </svg>
              Sending...
            </>
          ) : (
            "Send"
          )}
        </button>

        <div className="separator">
          <hr className="line" />
          <span>Or</span>
          <hr className="line" />
        </div>

        <div className="header">
          <h3>
            Remember password? &nbsp;
            <Link className="link redirect-link" to={constants.ROUTES.LOGIN}>
              Sign In
            </Link>
          </h3>
        </div>

        <p className="note">
          © Fiverr International Ltd. {new Date().getFullYear()}
        </p>
      </form>
    </div>
  );
};
