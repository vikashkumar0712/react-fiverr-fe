import "./GenderSelector.scss";
import React from "react";

export const GenderSelector = ({ onClickSet }) => {
  return (
    <div className="radio-inputs">
      <label>
        <input
          className="radio-input"
          type="radio"
          name="gender"
          onClick={() => onClickSet("male")}
        />
        <span className="radio-tile">
          <span className="radio-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200px"
              height="200px"
              viewBox="0 0 50 50"
              style={{
                enableBackground: "new 0 0 512 512",
              }}
              xmlSpace="preserve"
            >
              <path
                d="M45.8 1.7H32c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5h7.7l-9.2 9.2c-7.1-5.3-17.2-4.8-23.6 1.6-7 7-7 18.5 0 25.5s18.5 7 25.5 0c6.4-6.4 7-16.6 1.6-23.6l9.2-9.2V18c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V4.2c.1-1.4-1-2.5-2.4-2.5zM29 39.5c-5.1 5.1-13.4 5.1-18.5 0s-5.1-13.4 0-18.5 13.4-5.1 18.5 0 5.1 13.4 0 18.5z"
                data-original="#000000"
              />
            </svg>
          </span>
          <span className="radio-label">Male</span>
        </span>
      </label>

      <label>
        <input
          className="radio-input"
          type="radio"
          name="gender"
          onClick={() => onClickSet("female")}
        />
        <span className="radio-tile">
          <span className="radio-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200px"
              height="200px"
              viewBox="0 0 50 50"
              style={{
                enableBackground: "new 0 0 512 512",
              }}
              xmlSpace="preserve"
            >
              <path
                d="M44 6C37.5-.5 27-.5 20.5 6c-5.7 5.7-6.4 14.7-2 21.1l-4.6 4.6-5.1-5.1c-1.2-1.2-3.2-1.2-4.4 0s-1.2 3.2 0 4.4l5.1 5.1L2 43.6C.8 44.8.8 46.8 2 48s3.2 1.2 4.4 0l7.5-7.5 5.1 5.1c1.2 1.2 3.2 1.2 4.4 0s1.2-3.2 0-4.4l-5.1-5.1 4.6-4.6c6.5 4.4 15.4 3.8 21.1-2 6.5-6.5 6.5-17 0-23.5zm-4.4 19.1c-4.1 4.1-10.7 4.1-14.8 0s-4.1-10.7 0-14.8 10.7-4.1 14.8 0 4.1 10.8 0 14.8z"
                data-original="#000000"
              />
            </svg>
          </span>
          <span className="radio-label">Female</span>
        </span>
      </label>
    </div>
  );
};
