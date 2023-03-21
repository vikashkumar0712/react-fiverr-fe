import "./Review.scss";
import React from "react";
import constants from "../../common/constants";
import utility from "../../utils/utility";

export const Review = ({ review }) => {
  const user = review && review.userDetails;
  const starsCount = new Array(review.star > 0 ? review.star : 1).fill("star");
  return (
    <div className="review">
      <div className="user">
        <img className="pp" src={user.img} alt="profile-picture" />
        <div className="info">
          <span>{user.username}</span>
          <div className="country">
            <img src={utility.countryToFlag(user.country)} alt="flag" />
            <span>{user.country}</span>
          </div>
        </div>
      </div>
      <div className="stars">
        {starsCount.map((star, index) => {
          return (
            <img
              key={index}
              src={constants.ENUMS.ASSETS.ICONS.STAR}
              alt={`${star}-${index + 1}`}
            />
          );
        })}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src={constants.ENUMS.ASSETS.ICONS.LIKE} alt="like" />
        <span>Yes</span>
        <img src={constants.ENUMS.ASSETS.ICONS.DISLIKE} alt="dislike" />
        <span>No</span>
      </div>
    </div>
  );
};
