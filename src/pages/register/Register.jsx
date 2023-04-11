import "./Register.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { upload } from "../../utils/upload";
import { newRequest } from "../../utils/request";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import constants from "../../common/constants";
import utility from "../../utils/utility";

export const Register = () => {
  // States management
  const [selected, setSelected] = useState("IN");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    country: undefined,
    img: undefined,
    phone: undefined,
    desc: undefined,
    isSeller: false,
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleChange = {
      ...credentials,
      isSeller: searchParams.has("seller"),
    };
    setCredentials(handleChange);
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

  const handleFile = (e) => {
    const { files } = e.target;
    const file = files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const url = file
        ? await toast.promise(upload(file), constants.PARAMS.IMAGE_UPLOADING)
        : undefined;

      const registerData = {
        ...credentials,
        img: url,
        country: utility.codeToCountry(selected),
      };
      const { data: response } = await newRequest.post(
        "/services/register",
        registerData
      );

      toast.success(response.data);
      setIsLoading(false);
      setTimeout(() => navigate(constants.ROUTES.HOME), 4000);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error || error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">
            Username <span>*</span>
          </label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleCredentials}
            required
          />
          <label htmlFor="">
            Email <span>*</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
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
            onChange={handleCredentials}
            required
          />
          <label htmlFor="">
            Country <span>*</span>
          </label>
          <ReactFlagsSelect
            className="menu-flags"
            searchPlaceholder="Search countries"
            searchable={true}
            selected={selected}
            onSelect={(code) => setSelected(code)}
          />
          <label htmlFor="">Profile Picture</label>
          <input type="file" name="images/*" onChange={handleFile} />

          <button type="submit" className="register-button">
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input
                type="checkbox"
                checked={searchParams.has("seller") ? true : undefined}
                onChange={handleSeller}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+91 9876543210"
            onChange={handleCredentials}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleCredentials}
          ></textarea>
        </div>
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
