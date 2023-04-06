import "./GigCard.scss";
import React from "react";
import { Link } from "react-router-dom";
import constants from "../../common/constants";

export const GigCard = ({ gig }) => {
  const { userDetails: user } = gig;

  const stars = !isNaN(gig.totalStars / gig.starNumber)
    ? Math.round(gig.totalStars / gig.starNumber)
    : 0;

  return (
    <Link to={`/gig/${gig._id}`} className="link">
      <div className="gig-card">
        <img src={gig.cover} alt="gig-image" />
        <div className="info">
          <div className="user">
            <img src={user.img} alt={user.username} />
            <span>{user.username}</span>
          </div>
          <p>{gig.desc}</p>
          <div className="star">
            <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
            <span>{stars}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src={constants.ENUMS.ASSETS.ICONS.HEART} alt="heart" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>₹ {gig.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};
