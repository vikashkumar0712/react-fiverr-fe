import "./Loader.scss";
import React from "react";

export const Loader = () => {
  return (
    <div className="spinner-box">
      <div className="circle-border">
        <div className="circle-core"></div>
      </div>
    </div>
  );
};