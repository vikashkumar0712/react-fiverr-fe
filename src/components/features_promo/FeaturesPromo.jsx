import "./FeaturesPromo.scss";
import React from "react";
import constants from "../../common/constants";

export const FeaturesPromo = () => {
  return (
    <div className="features-promo">
      <div className="container">
        <div className="left">
          <h1>A whole world of freelance talent at your fingertips</h1>
          <div className="title">
            <img src={constants.ENUMS.ASSETS.ICONS.CHECK} alt="check-icon" />
            The best for every budget
          </div>
          <p>
            Find high-quality services at every price point. No hourly rates,
            just project-based pricing.
          </p>
          <div className="title">
            <img src={constants.ENUMS.ASSETS.ICONS.CHECK} alt="check-icon" />
            Quality work done quickly
          </div>
          <p>
          Find the right freelancer to begin working on your project within minutes.
          </p>
          <div className="title">
            <img src={constants.ENUMS.ASSETS.ICONS.CHECK} alt="check-icon" />
            Protected payments, every time
          </div>
          <p>
          Always know what you&apos;ll pay upfront. Your payment isn&apos;t released until you approve the work.
          </p>
          <div className="title">
            <img src={constants.ENUMS.ASSETS.ICONS.CHECK} alt="check-icon" />
            24/7 support
          </div>
          <p>
          Questions? Our round-the-clock support team is available to help anytime, anywhere.
          </p>
        </div>
        <div className="right">
          <video src={constants.ENUMS.ASSETS.VIDEOS.PROMO} controls></video>
        </div>
      </div>
    </div>
  );
};
