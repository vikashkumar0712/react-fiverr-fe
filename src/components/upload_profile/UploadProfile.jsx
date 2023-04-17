import "./UploadProfile.scss";
import React from "react";

export const UploadProfile = ({ preview, image, onImageChange }) => {
  return (
    <div className="upload">
      <div className="circle">
        <img alt="preview image" src={image ? image : preview} />
      </div>

      <div className="round">
        <input type="file" accept="image/*" onChange={onImageChange} />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={24}
          height={24}
          x={0}
          y={0}
          viewBox="0 0 512 512"
          style={{
            enableBackground: "new 0 0 512 512",
          }}
          xmlSpace="preserve"
          className=""
        >
          <g>
            <switch>
              <g>
                <path
                  d="M487 231c-13.8 0-25 11.2-25 25 0 113.6-92.4 206-206 206S50 369.6 50 256c0-13.8-11.2-25-25-25S0 242.2 0 256c0 68.4 26.6 132.7 75 181 48.4 48.4 112.6 75 181 75s132.7-26.6 181-75c48.4-48.4 75-112.6 75-181 0-13.8-11.2-25-25-25z"
                  fill="#ffffff"
                  data-original="#000000"
                  className=""
                />
                <path
                  d="M194.1 112.5 231 75.6v257.2c0 13.8 11.2 25 25 25s25-11.2 25-25V75.6l36.9 36.9c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3c9.8-9.8 9.8-25.6 0-35.4l-62.9-62.9C281.2 5.1 269 0 256 0s-25.2 5.1-34.3 14.2l-62.9 62.9c-9.8 9.8-9.8 25.6 0 35.4 9.7 9.8 25.5 9.8 35.3 0z"
                  fill="#ffffff"
                  data-original="#000000"
                  className=""
                />
              </g>
            </switch>
          </g>
        </svg>
      </div>
    </div>
  );
};
