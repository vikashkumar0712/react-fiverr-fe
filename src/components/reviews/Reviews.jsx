import "./Reviews.scss";
import React from "react";
import { Review } from "../review/Review";

export const Reviews = () => {
  const reviews = 5;
  const reviewsCount = new Array(reviews > 0 ? reviews : 1).fill("review");
  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {reviewsCount.map((_review, index) => {
        return (
          <>
            <Review key={index} />
            <hr />
          </>
        );
      })}
    </div>
  );
};
