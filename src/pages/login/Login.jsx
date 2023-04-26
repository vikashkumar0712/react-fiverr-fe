import "./Login.scss";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      navigate(
        currentUser.completed
          ? constants.ROUTES.HOME
          : constants.ROUTES.SETUP_ACCOUNT
      );
    } catch (error) {
      setIsLoading(false);
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="login bg-animation">
      <div className="bg-1"></div>
      <div className="bg-2"></div>
      <div className="bg-3"></div>

      <form onSubmit={handleSubmit}>
        <div className="header">
          <label className="title">Sign In to Fiverr</label>
          <p className="description">
            Join the world&apos;s largest freelance community and unleash your
            talent on Fiverr!
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
            name="username"
            type="text"
            placeholder="Enter your Email / Username"
            value={credentials.username}
            onChange={handleCredentials}
            required
          />
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
              d="M18 11.004A3.645 3.645 0 0 0 14.952 9.1a103.22 103.22 0 0 0-4.623-.1c-1.65 0-3.148.034-4.623.1-1.753.077-3.193 1.388-3.427 3.062C2.126 13.254 2 14.373 2 15.513c0 1.14.126 2.26.279 3.352.234 1.674 1.674 2.985 3.427 3.063.714.031 1.554.055 2.294.072"
              stroke="#141B34"
            />
            <path d="M6 9V6.5a4.5 4.5 0 0 1 9 0V9" stroke="#141B34" />
            <path
              d="m21.205 15.104-.58.592.58-.591Zm.215 1.373a.829.829 0 0 0 1.16-1.183l-1.16 1.183Zm-3.397-1.373-.58-.59.58.59Zm.215 2.935a.828.828 0 1 0 1.16-1.183l-1.16 1.183Zm-3.978 2.723a1.45 1.45 0 0 1-2.02 0l-1.161 1.182a3.108 3.108 0 0 0 4.342 0l-1.16-1.182Zm-2.02 0a1.352 1.352 0 0 1 0-1.942l-1.161-1.182a3.01 3.01 0 0 0 0 4.306l1.16-1.182Zm0-1.942a1.45 1.45 0 0 1 2.02 0l1.161-1.182a3.108 3.108 0 0 0-4.342 0l1.16 1.182Zm2.02 0a1.353 1.353 0 0 1 0 1.942l1.161 1.182a3.01 3.01 0 0 0 0-4.306l-1.16 1.182Zm6.364-3.124.796.78 1.16-1.181-.795-.782-1.16 1.183Zm-5.203 3.124 2.387-2.343-1.161-1.183-2.387 2.344 1.161 1.182Zm2.387-2.343.795-.781-1.16-1.183-.796.781 1.16 1.183Zm-1.161 0 1.59 1.562 1.162-1.183-1.591-1.562-1.161 1.183Zm5.138-1.964c-.358-.351-.685-.675-.986-.9-.32-.24-.703-.441-1.185-.441v1.656s.005 0 .026.008c.026.01.078.037.166.103.19.143.427.372.818.757l1.161-1.183Zm-3.182 1.183c.392-.385.627-.614.819-.757a.809.809 0 0 1 .166-.103c.02-.009.025-.008.026-.008v-1.656c-.483 0-.866.201-1.186.441-.3.225-.627.549-.986.9l1.161 1.183Z"
              fill="#141B34"
            />
          </svg>
          <input
            className="input-field"
            name="password"
            type="password"
            placeholder="Enter your Password"
            value={credentials.password}
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
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>

        <div className="separator">
          <hr className="line" />
          <span>Or</span>
          <hr className="line" />
        </div>

        <button title="Sign In" type="button" className="sign-in-ggl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 512 512"
            style={{ enableBackground: "new 0 0 512 512" }}
            xmlSpace="preserve"
          >
            <path
              d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
              fill="#fbbb00"
              data-original="#fbbb00"
            />
            <path
              d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
              fill="#518ef8"
              data-original="#518ef8"
            />
            <path
              d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
              fill="#28b446"
              data-original="#28b446"
            />
            <path
              d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
              fill="#f14336"
              data-original="#f14336"
            />
          </svg>

          <span>
            <b>Continue with Google</b>
          </span>
        </button>

        <div className="header">
          <h3>
            Not a member yet? &nbsp;
            <Link className="link redirect-link" to={constants.ROUTES.REGISTER}>
              Join Now
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
