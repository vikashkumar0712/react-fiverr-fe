import "./GigCard.scss";
import React from "react";
import { Link } from "react-router-dom";
import constants from "../../common/constants";

export const GigCard = ({
  gig,
  isAdded = false,
  onClickAdd,
  onClickRemove,
}) => {
  const { userDetails: user } = gig;

  const stars = !isNaN(gig.totalStars / gig.starNumber)
    ? Math.round(gig.totalStars / gig.starNumber)
    : 0;

  const starsCount = new Array(stars).fill("star");

  return (
    <div className="gig-card">
      <Link to={`/gig/${gig._id}`} className="link">
        <img src={gig.cover} alt="gig-image" />
        <div className="info">
          <div className="user">
            <img src={user.img} alt={user.username} />
            <div className="verified">
              <img
                className="icon"
                src={constants.ENUMS.ASSETS.ICONS.VERIFIED}
                alt="orders"
                style={{ width: "10px", height: "10px" }}
              />
            </div>
            <span>{user.username}</span>
          </div>
          <p>{gig?.title?.substring(0, 38)}...</p>
          <div className="star">
            <span>{stars > 0 ? stars : "No Rating!"}</span>
            {starsCount.map((star, index) => {
              return (
                <img
                  key={index}
                  src={constants.ENUMS.ASSETS.ICONS.STAR}
                  alt={`${star}-${index + 1}`}
                />
              );
            })}
          </div>
        </div>
        <hr />
      </Link>
      <div className="detail">
        <img
          src={constants.ENUMS.ASSETS.ICONS.HEART}
          alt="heart"
          className={isAdded ? "fill-red" : undefined}
          onClick={() =>
            isAdded
              ? onClickRemove(gig._id)
              : onClickAdd({
                  gigId: gig._id,
                  title: gig.title,
                  img: gig.cover,
                  price: gig.price,
                })
          }
        />
        <div className="price">
          <span>STARTING AT</span>
          <h2>₹ {gig.price}</h2>
        </div>
      </div>
    </div>
  );
};
