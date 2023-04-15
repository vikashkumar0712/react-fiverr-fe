import "./Menu.scss";
import React from "react";
import { Link } from "react-router-dom";
import constants from "../../common/constants";

export const Menu = () => {
  return (
    <>
      <hr />
      <div className="menu">
        <Link
          className="link"
          to={`${constants.ROUTES.GIGS}?cat=${constants.CATEGORIES.GRAPHICS_DESIGN}`}
        >
          Graphics & Design
        </Link>
        <Link
          className="link"
          to={`${constants.ROUTES.GIGS}?cat=${constants.CATEGORIES.VIDEO_ANIMATION}`}
        >
          Video & Animation
        </Link>
        <Link
          className="link"
          to={`${constants.ROUTES.GIGS}?cat=${constants.CATEGORIES.WRITING_TRANSLATION}`}
        >
          Writing & Translation
        </Link>
        <Link
          className="link"
          to={`${constants.ROUTES.GIGS}?cat=${constants.CATEGORIES.AI_SERVICES}`}
        >
          AI Services
        </Link>
        <Link
          className="link"
          to={`${constants.ROUTES.GIGS}?cat=${constants.CATEGORIES.DIGITAL_MARKETING}`}
        >
          Digital Marketing
        </Link>
        <Link
          className="link"
          to={`${constants.ROUTES.GIGS}?cat=${constants.CATEGORIES.MUSIC_AUDIO}`}
        >
          Music & Audio
        </Link>
        <Link
          className="link"
          to={`${constants.ROUTES.GIGS}?cat=${constants.CATEGORIES.PROGRAMMING_TECH}`}
        >
          Programming & Tech
        </Link>
        <Link
          className="link"
          to={`${constants.ROUTES.GIGS}?cat=${constants.CATEGORIES.BUSINESS}`}
        >
          Business
        </Link>
        <Link
          className="link"
          to={`${constants.ROUTES.GIGS}?cat=${constants.CATEGORIES.PHOTOGRAPHY}`}
        >
          Photography
        </Link>
      </div>
      <hr />
    </>
  );
};
