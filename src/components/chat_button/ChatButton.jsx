import "./ChatButton.scss";
import React from "react";

export const ChatButton = ({ item, onClickChat, small = false }) => {
  return (
    <button className="chat-btn" onClick={() => onClickChat(item)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={small ? "15.5" : "17.5"}
        width={small ? "13" : "15"}
        viewBox="0 0 24 24"
        style={{ enableBackground: "new 0 0 512 512" }}
        xmlSpace="preserve"
        className="chat-btn-icon"
      >
        <path
          d="M14.76 22.65a2.3 2.3 0 0 1-2-1.23l-3.48-6.36a.8.8 0 0 0-.34-.34l-6.36-3.43A2.34 2.34 0 0 1 3 7l16.57-5.53a2.35 2.35 0 0 1 3 3L17 21.05a2.31 2.31 0 0 1-2 1.59ZM20 2.9 3.43 8.43a.84.84 0 0 0-.58.73.83.83 0 0 0 .44.81l6.36 3.43a2.29 2.29 0 0 1 .95.95l3.4 6.36a.83.83 0 0 0 .81.44.84.84 0 0 0 .73-.58L21.1 4A.84.84 0 0 0 20 2.9Z"
          data-original="#000000"
        />
        <path
          d="M9.67 15.08a.71.71 0 0 1-.53-.22.74.74 0 0 1 0-1.06L20.9 2A.75.75 0 0 1 22 3.1L10.2 14.86a.74.74 0 0 1-.53.22Z"
          data-original="#000000"
        />
      </svg>
    </button>
  );
};
