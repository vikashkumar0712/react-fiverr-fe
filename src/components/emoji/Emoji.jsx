import "./Emoji.scss";
import React from "react";

export const Emoji = () => {
  return (
    <div className="c-smileyButton">
      <div className="c-smileyButton__hoverListener"></div>
      <div className="c-smileyButton__hoverListener"></div>
      <span className="c-smileyButton__face"></span>
    </div>
  );
};
