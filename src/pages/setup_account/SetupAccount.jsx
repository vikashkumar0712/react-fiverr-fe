import "./SetupAccount.scss";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadProfile } from "../../components/upload_profile/UploadProfile";
import { MagicButton } from "../../components/magic_button/MagicButton";
import { newRequest } from "../../utils/request";
import { upload } from "../../utils/upload";
import axios from "axios";
import ReactFlagsSelect from "react-flags-select";
import constants from "../../common/constants";
import utility from "../../utils/utility";

export const SetupAccount = () => {
  // States management
  const [isCompleted, setCompleted] = useState(false);
  const [selected, setSelected] = useState("IN");
  const [image, setImage] = useState({
    file: null,
    selected: null,
  });
  const [credentials, setCredentials] = useState({
    phone: "",
    desc: "",
    img: undefined,
  });

  const currentUser = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE.CURRENT_USER)
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocation = async () => {
      const { data: response } = await axios.get(
        `${constants.ENUMS.IP_INFO_URL}${import.meta.env.VITE_IP_INFO_TOKEN}`
      );

      setSelected(response.country);
    };

    fetchLocation();
  }, []);

  // Methods
  const handleCredentials = (e) => {
    const { name, value } = e.target;
    const handleChange = { ...credentials, [name]: value };
    setCredentials(handleChange);
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const selected = URL.createObjectURL(file);

      const fileWithSelectedImage = {
        file: file,
        selected: selected,
      };

      setImage({ ...fileWithSelectedImage });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = image.file
        ? await toast.promise(
            upload(image.file),
            constants.PARAMS.IMAGE_UPLOADING
          )
        : credentials.img;

      const setupAccountParams = {
        ...credentials,
        img: url,
        phone: `${utility.getCountriesDialCode(selected)} ${credentials.phone}`,
      };

      const { data: response } = await newRequest.post(
        "/user/setup-account",
        setupAccountParams
      );

      setCompleted(true);

      localStorage.setItem(
        constants.LOCAL_STORAGE.CURRENT_USER,
        JSON.stringify(response.data)
      );

      toast.success(constants.SUCCESS_MESSAGES.PROFILE_COMPLETED);
      setTimeout(() => navigate(constants.ROUTES.HOME), 4000);
    } catch (error) {
      if (error.code === constants.RESP_ERR_CODES.ERR_NETWORK) {
        toast.error(constants.ERROR_MESSAGES.NOT_AUTHORIZED);
      } else {
        console.error(error);
        toast.error(error?.response?.data?.error || error.message);
      }
    }
  };

  return (
    <div className="setup-account">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <label className="title">
            Welcome to Fiverr,
            <b> {utility.toTitleCase(currentUser.username)} 🎉</b>
          </label>

          <p className="description">
            Just a few more personal information is required to complete your
            profile!
          </p>
        </div>

        <div className="input-container">
          <div className="input-profile">
            <UploadProfile
              preview={currentUser.img}
              image={image.selected}
              onImageChange={onImageChange}
            />
          </div>
        </div>

        <div className="input-container">
          <ReactFlagsSelect
            className="dial-code-selector"
            selected={selected}
            onSelect={(code) => setSelected(code)}
            customLabels={utility.getCountriesDialCode()}
          />

          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 211.621 211.621"
            style={{
              enableBackground: "new 0 0 512 512",
            }}
            xmlSpace="preserve"
          >
            <g fill="#141b34">
              <path
                d="M180.948 27.722C163.07 9.844 139.299-.001 114.017 0a7.5 7.5 0 0 0 0 15c21.276-.001 41.279 8.284 56.324 23.329 15.046 15.045 23.331 35.049 23.33 56.326a7.5 7.5 0 0 0 15 .001c.001-25.285-9.844-49.056-27.723-66.934z"
                data-original="#000000"
              />
              <path
                d="M150.096 94.656c0 4.142 3.358 7.5 7.501 7.499a7.5 7.5 0 0 0 7.499-7.5c-.002-28.16-22.916-51.073-51.078-51.077h-.001a7.5 7.5 0 0 0-.001 15c19.893.003 36.078 16.187 36.08 36.078zm-16.596 38.24c-11.432-.592-17.256 7.91-20.049 11.994a7.5 7.5 0 1 0 12.381 8.469c3.3-4.825 4.795-5.584 6.823-5.488 6.491.763 32.056 19.497 34.616 25.355.642 1.725.618 3.416-.071 5.473-2.684 7.966-7.127 13.564-12.851 16.188-5.438 2.493-12.105 2.267-19.276-.651-26.777-10.914-50.171-26.145-69.531-45.271l-.023-.023c-19.086-19.341-34.289-42.705-45.185-69.441-2.919-7.177-3.145-13.845-.652-19.282 2.624-5.724 8.222-10.167 16.181-12.848 2.064-.692 3.752-.714 5.461-.078 5.879 2.569 24.612 28.133 25.368 34.551.108 2.104-.657 3.598-5.478 6.892a7.5 7.5 0 1 0 8.461 12.385c4.086-2.79 12.586-8.598 11.996-20.069-.65-11.982-23.958-43.713-35.095-47.808-4.953-1.846-10.163-1.878-15.491-.09-11.988 4.037-20.646 11.235-25.038 20.815-4.26 9.294-4.125 20.077.395 31.189 11.661 28.612 27.976 53.647 48.491 74.412.05.051.101.101.153.15 20.75 20.477 45.756 36.762 74.33 48.409 5.722 2.327 11.357 3.492 16.746 3.492 5.074 0 9.932-1.032 14.438-3.098 9.581-4.391 16.778-13.048 20.818-25.044 1.784-5.318 1.755-10.526-.077-15.456-4.109-11.167-35.84-34.475-47.841-35.127z"
                data-original="#000000"
              />
            </g>
          </svg>

          <input
            className="input-field"
            name="phone"
            type="text"
            placeholder="What's your best Contact?"
            value={credentials.phone}
            onChange={handleCredentials}
            required
          />
        </div>

        <div className="text-area-container">
          <svg
            className="text-area-icon"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            style={{
              enableBackground: "new 0 0 512 512",
            }}
            xmlSpace="preserve"
          >
            <g fillRule="evenodd" clipRule="evenodd" fill="#141b34">
              <path
                d="M3.53 4.53c-.511.512-.78 1.465-.78 3.47v8c0 2.005.269 2.958.78 3.47s1.465.78 3.47.78h10c2.005 0 2.958-.269 3.47-.78s.78-1.465.78-3.47V8c0-2.005-.269-2.958-.78-3.47s-1.465-.78-3.47-.78H7c-2.005 0-2.958.269-3.47.78zM2.47 3.47C3.458 2.48 5.005 2.25 7 2.25h10c1.995 0 3.542.231 4.53 1.22S22.75 6.005 22.75 8v8c0 1.995-.231 3.542-1.22 4.53s-2.535 1.22-4.53 1.22H7c-1.995 0-3.542-.231-4.53-1.22S1.25 17.995 1.25 16V8c0-1.995.231-3.542 1.22-4.53z"
                data-original="#000000"
              />
              <path
                d="M13.25 8a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75zm1 4a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75zm2 4a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75zM8.5 8.42a1.06 1.06 0 1 0 0 2.12 1.06 1.06 0 0 0 0-2.12zM5.94 9.48a2.56 2.56 0 1 1 5.12 0 2.56 2.56 0 0 1-5.12 0zm3.391 3.383a3.77 3.77 0 0 1 3.416 3.395.75.75 0 0 1-1.493.144 2.27 2.27 0 0 0-2.06-2.045h-.009v-.001a6.975 6.975 0 0 0-1.372 0 2.28 2.28 0 0 0-2.066 2.046.75.75 0 0 1-1.493-.144 3.78 3.78 0 0 1 3.413-3.395 8.468 8.468 0 0 1 1.664 0z"
                data-original="#000000"
              />
            </g>
          </svg>

          <textarea
            className="text-area-field"
            name="desc"
            placeholder="Short bios that you may use to promote yourself to other users :)"
            cols="20"
            rows="20"
            value={credentials.desc}
            onChange={handleCredentials}
            required
          ></textarea>
        </div>

        <MagicButton
          text={"Complete"}
          type={"submit"}
          isCelebrate={isCompleted}
        />

        <p className="note">
          © Fiverr International Ltd. {new Date().getFullYear()}
        </p>
      </form>
    </div>
  );
};
