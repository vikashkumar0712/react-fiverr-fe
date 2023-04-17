import "./Register.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { newRequest } from "../../utils/request";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GenderSelector } from "../../components/gender_selector/GenderSelector";
import axios from "axios";
import ReactFlagsSelect from "react-flags-select";
import constants from "../../common/constants";
import utility from "../../utils/utility";

export const Register = () => {
  // States management
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    country: undefined,
    gender: undefined,
    isSeller: false,
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocationOrIsSeller = async () => {
      const { data: response } = await axios.get(
        `${constants.ENUMS.IP_INFO_URL}${import.meta.env.VITE_IP_INFO_TOKEN}`
      );

      const handleChange = {
        ...credentials,
        isSeller: searchParams.has("seller"),
      };

      setCredentials(handleChange);
      setSelected(response.country);
    };

    fetchLocationOrIsSeller();
  }, []);

  // Methods
  const handleCredentials = (e) => {
    const { name, value } = e.target;
    const handleChange = { ...credentials, [name]: value };
    setCredentials(handleChange);
  };

  const handleSeller = (e) => {
    const { checked } = e.target;
    const handleChange = { ...credentials, isSeller: checked };
    setCredentials(handleChange);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (gender !== "") {
        setIsLoading(true);

        const registerData = {
          ...credentials,
          gender: gender,
          country: utility.getCountriesCountryCode(selected),
        };

        const { data: response } = await newRequest.post(
          "/services/register",
          registerData
        );

        toast.success(response.data);
        setTimeout(() => navigate(constants.ROUTES.HOME), 4000);
      } else {
        toast.error(constants.ERROR_MESSAGES.NO_GENDER_SELECTED);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error || error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="register bg-animation">
      <div className="bg-1"></div>
      <div className="bg-2"></div>
      <div className="bg-3"></div>

      <form onSubmit={handleSubmit}>
        <div className="header">
          <label className="title">Sign Up for a Fiverr account</label>
          <p className="description">Join our growing freelance community!</p>
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
            placeholder="What's your best contact Email?"
            value={credentials.email}
            onChange={handleCredentials}
            required
          />
        </div>

        <div className="input-container">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width={23}
            height={23}
            viewBox="0 0 24 24"
            style={{
              enableBackground: "new 0 0 512 512",
            }}
            xmlSpace="preserve"
          >
            <path
              fill="#141b34"
              fillRule="evenodd"
              d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zm-.187 8.617C7.443 15.597 9.633 15 12 15c2.367 0 4.557.598 6.187 1.617C19.803 17.627 21 19.15 21 21a1 1 0 1 1-2 0c0-.911-.594-1.888-1.873-2.688C15.862 17.523 14.052 17 12 17s-3.862.522-5.127 1.313C5.593 19.111 5 20.088 5 21a1 1 0 1 1-2 0c0-1.85 1.197-3.373 2.813-4.383z"
              clipRule="evenodd"
              data-original="#000000"
            />
          </svg>
          <input
            className="input-field"
            name="username"
            type="text"
            placeholder="Choose your unique Username"
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
            placeholder="Choose your strong Password"
            value={credentials.password}
            onChange={handleCredentials}
            required
          />
        </div>

        <ReactFlagsSelect
          className="input-field"
          searchPlaceholder="Search countries"
          searchable={true}
          selected={selected}
          onSelect={(code) => setSelected(code)}
        />

        <div className="separator">
          <div className="gender">
            <GenderSelector onClickSet={setGender} />
          </div>

          <span>|</span>

          <div className="toggle">
            <div className="header">
              <h3>{credentials.isSeller ? "Seller" : "Buyer"}</h3>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={searchParams.has("seller") ? true : undefined}
                onChange={handleSeller}
              />

              <span className="slider round"></span>
            </label>
          </div>
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
              Signing up...
            </>
          ) : (
            "Sign up"
          )}
        </button>

        <div className="separator">
          <hr className="line" />
          <span>Or</span>
          <hr className="line" />
        </div>

        <div className="header">
          <h3>
            Already a member? &nbsp;
            <Link className="link redirect-link" to={constants.ROUTES.LOGIN}>
              Sign In
            </Link>
          </h3>
        </div>

        <p className="note">
          © Fiverr International Ltd. {new Date().getFullYear()}
        </p>
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
