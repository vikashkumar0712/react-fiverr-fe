import "./GigCard.scss";
import React from "react";
import { Link } from "react-router-dom";
import constants from "../../common/constants";

export const GigCard = ({ item }) => {
  return (
    <Link to={`/gig/123`} className="link">
      <div className="gig-card">
        <img src={item.img} alt="gig-image" />
        <div className="info">
          <div className="user">
            <img src={item.pp} alt={item.username} />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
            <span>{item.star}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src={constants.ENUMS.ASSETS.ICONS.HEART} alt="heart" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
                $ {item.price}
                  <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};
