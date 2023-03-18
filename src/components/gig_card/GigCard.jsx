import "./GigCard.scss";
import React from "react";
import { Link } from "react-router-dom";
import constants from "../../common/constants";

export const GigCard = ({ item }) => {
  const { userDetails: user } = item;

  const stars = !isNaN(item.totalStars / item.starNumber)
    ? Math.round(item.totalStars / item.starNumber)
    : 0;

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gig-card">
        <img src={item.cover} alt="gig-image" />
        <div className="info">
          <div className="user">
            <img src={user.img} alt={user.username} />
            <span>{user.username}</span>
          </div>
          <p>{item.desc}</p>
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
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};
