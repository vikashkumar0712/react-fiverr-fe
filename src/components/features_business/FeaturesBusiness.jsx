import "./FeaturesBusiness.scss";
import React from "react";
import { Link } from "react-router-dom";
import constants from "../../common/constants";

export const FeaturesBusiness = () => {
  return (
    <div className="features-business">
      <div className="container">
        <div className="left">
          <h1>
            fiverr <i>business</i>.
          </h1>
          <h1>
            A business solution designed for <i>teams</i>
          </h1>
          <p>
            Upgrade to a curated experience packed with tools and benefits,
            dedicated to businesses
          </p>
          <div className="title">
            <img src={constants.ENUMS.ASSETS.ICONS.CHECK} alt="check-icon" />
            Connect to freelancers with proven business experience
          </div>
          <div className="title">
            <img src={constants.ENUMS.ASSETS.ICONS.CHECK} alt="check-icon" />
            Get matched with the perfect talent by a customer success manager
          </div>
          <div className="title">
            <img src={constants.ENUMS.ASSETS.ICONS.CHECK} alt="check-icon" />
            Manage teamwork and boost productivity with one powerful workspace
          </div>
          <div className="io-button">
            <Link className="link" to={constants.ROUTES.EXPLORE}>
              Explore Fiverr Business
            </Link>
          </div>
        </div>
        <div className="right">
          <img
            src={constants.ENUMS.ASSETS.IMAGES.POSTER_BUSINESS}
            alt="poster-business"
          ></img>
        </div>
      </div>
    </div>
  );
};
