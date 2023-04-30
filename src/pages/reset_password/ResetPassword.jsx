import "./ResetPassword.scss";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { newRequest } from "../../utils/request";
import { useNavigate, useParams } from "react-router-dom";
import constants from "../../common/constants";

export const ResetPassword = () => {
  // States management
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    hash: undefined,
    password: "",
  });

  const navigate = useNavigate();
  const { hash } = useParams();

  useEffect(() => {
    const fetchResetPasswordHash = () => {
      if (hash.length <= 24 && hash.length >= 24) {
        const handleChange = { ...credentials, hash: hash };
        setCredentials(handleChange);
      } else {
        navigate(constants.ROUTES.HOME);
      }
    };
    fetchResetPasswordHash();
  }, [hash]);

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

      const resetPasswordParams = {
        ...credentials,
      };

      await newRequest.post("/services/verify-link", resetPasswordParams);

      toast.success(constants.SUCCESS_MESSAGES.PASSWORD_RESET);
      navigate(constants.ROUTES.LOGIN);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error || error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password bg-animation">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <label className="title">Set Your Password</label>
          <p className="description">
            Your new password must be different to previously used password!
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
            placeholder="Choose your new strong Password"
            value={credentials.password}
            onChange={handleCredentials}
            required
          />
        </div>

        <button type="submit" className="io-button">
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
              Confirming...
            </>
          ) : (
            "Confirm"
          )}
        </button>

        <p className="note">
          © Fiverr International Ltd. {new Date().getFullYear()}
        </p>
      </form>
    </div>
  );
};
