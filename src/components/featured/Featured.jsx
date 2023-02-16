import "./Featured.scss";
import React from "react";
import constants from "../../common/constants";

export const Featured = () => {
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="search-input">
              <img
                src={constants.ENUMS.ASSETS.ICONS.SEARCH}
                alt="search-icon"
              />
              <input type="text" placeholder='Try "building web app"' />
            </div>
            <button>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>Wordpress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className="right">
          <div className="image-container">
            <img src={constants.ENUMS.ASSETS.IMAGES.POSTER} alt="poster" />
          </div>
        </div>
      </div>
    </div>
  );
};
