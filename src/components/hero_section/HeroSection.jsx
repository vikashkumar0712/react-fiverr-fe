import "./HeroSection.scss";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchResults } from "../search_results/SearchResults";
import { categoriesList } from "../../common/data";
import { tagsList } from "../../common/data";
import constants from "../../common/constants";

export const HeroSection = () => {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const refClick = useRef(null);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { value } = e.target;
    setInput(value);

    const getCategories = categoriesList.filter((category) =>
      category?.name?.toLowerCase()?.includes(value?.toLowerCase())
    );

    const getTags = tagsList.filter((tag) =>
      tag?.toLowerCase()?.includes(value?.toLowerCase())
    );

    setTags(getTags);
    setCategories(getCategories);
  };

  const handleSearch = () =>
    navigate(input !== "" && `${constants.ROUTES.GIGS}?search=${input}`);

  const handlePopular = (category) =>
    navigate(`${constants.ROUTES.GIGS}?cat=${category}`);

  const handleClick = (e) => {
    if (refClick && !refClick.current.contains(e.target)) {
      setTags([]);
      setCategories([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
  }, []);

  return (
    <div className="hero-section">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search-bar-container" ref={refClick}>
            <div className="search">
              <div className="search-input">
//                 <img
//                   src={constants.ENUMS.ASSETS.ICONS.SEARCH}
//                   alt="search-icon"
//                 />
                <input
                  type="text"
                  placeholder='Try "building web app"'
                  value={input}
                  onChange={handleInput}
                />
              </div>
              <button onClick={handleSearch}>Search</button>
            </div>
            {((categories && categories.length > 0) ||
              (tags && tags.length > 0)) && (
              <SearchResults
                tags={tags}
                categories={categories}
                input={input}
              />
            )}
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
