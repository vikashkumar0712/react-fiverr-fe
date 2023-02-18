import "./Footer.scss";
import React from "react";
import constants from "../../common/constants";

export const Footer = () => {
  //dynamic year
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="footer-links">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
            <span>Sitemap</span>
          </div>
          <div className="footer-links">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
            <span>Sitemap</span>
          </div>
          <div className="footer-links">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
            <span>Sitemap</span>
          </div>
          <div className="footer-links">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
            <span>Sitemap</span>
          </div>
          <div className="footer-links">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
            <span>Sitemap</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>fiverr</h2>
            <span>© Fiverr International Ltd. {year}</span>
          </div>
          <div className="right">
            <div className="social">
              <img src={constants.ENUMS.ASSETS.ICONS.TWITTER} alt="twitter" />
              <img src={constants.ENUMS.ASSETS.ICONS.FACEBOOK} alt="facebook" />
              <img src={constants.ENUMS.ASSETS.ICONS.LINKEDIN} alt="linkedin" />
              <img
                src={constants.ENUMS.ASSETS.ICONS.PINTEREST}
                alt="pinterest"
              />
              <img
                src={constants.ENUMS.ASSETS.ICONS.INSTAGRAM}
                alt="instagram"
              />
            </div>
            <div className="link">
              <img src={constants.ENUMS.ASSETS.ICONS.LANGUAGE} alt="language" />
              <span>English</span>
            </div>
            <div className="link">
              <img src={constants.ENUMS.ASSETS.ICONS.COIN} alt="coin" />
              <span>USD</span>
            </div>
            <img src={constants.ENUMS.ASSETS.ICONS.ACCESSIBILITY} alt="accessibility" />
          </div>
        </div>
      </div>
    </div>
  );
};
