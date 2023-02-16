import "./Slider.scss";
import React from "react";
import Slide from "infinite-react-carousel";

export const Slider = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className="slider">
      <div className="container">
        <Slide slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slide>
      </div>
    </div>
  );
};
