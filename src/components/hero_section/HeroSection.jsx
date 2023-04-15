import "./HeroSection.scss";
import React, { useState } from "react";
import constants from "../../common/constants";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleSearch = () =>
    navigate(
      input !== ""
        ? `${constants.ROUTES.GIGS}?search=${input}`
        : constants.ROUTES.GIGS
    );

  const handlePopular = (category) =>
    navigate(`${constants.ROUTES.GIGS}?cat=${category}`);

  return (
    <div className="hero-section">
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
              <input
                type="text"
                placeholder='Try "building web app"'
                value={input}
                onChange={handleInput}
              />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button
              onClick={() =>
                handlePopular(constants.CATEGORIES.WEB_DEVELOPMENT)
              }
            >
              Web Development
            </button>
            <button
              onClick={() => handlePopular(constants.CATEGORIES.WORDPRESS)}
            >
              WordPress
            </button>
            <button
              onClick={() => handlePopular(constants.CATEGORIES.LOGO_DESIGN)}
            >
              Logo Design
            </button>
            <button
              onClick={() => handlePopular(constants.CATEGORIES.AI_SERVICES)}
            >
              AI Services
            </button>
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
