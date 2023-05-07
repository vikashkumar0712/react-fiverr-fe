import "./Review.scss";
import { toast } from "react-toastify";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../utils/request";
import { Flag } from "../flag/Flag";
import { DeleteButton } from "../../components/delete_button/DeleteButton";
import utility from "../../utils/utility";
import constants from "../../common/constants";

export const Review = ({ review }) => {
  const currentUser = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE.CURRENT_USER)
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      await newRequest.delete(`/review/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const handleDeleteReview = async (id) => {
    try {
      await mutation.mutateAsync(id);

      toast.success(constants.SUCCESS_MESSAGES.REVIEW_DELETE);
    } catch (error) {
      if (error.code === constants.RESP_ERR_CODES.ERR_NETWORK) {
        toast.error(constants.ERROR_MESSAGES.NOT_AUTHORIZED);
      } else {
        console.error(error);
        toast.error(error?.response?.data?.error || error.message);
      }
    }
  };

  const user = review && review.userDetails;
  const starsCount = new Array(review.star).fill("star");

  return (
    <div className="review">
      <div className="user">
        <img className="pp" src={user.img} alt="profile-picture" />
        <div className="info">
          <span>{utility.toTitleCase(user.username)}</span>
          <div className="country">
            <Flag country={user.country} />
            <span>{user.country}</span>
          </div>
        </div>
      </div>
      <div className="stars">
        <span>{review.star}</span>
        {starsCount.map((star, index) => {
          return (
            <img
              key={index}
              src={constants.ENUMS.ASSETS.ICONS.STAR}
              alt={`${star}-${index + 1}`}
            />
          );
        })}
        <p> | {utility.timeAgo(review.createdAt)}</p>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src={constants.ENUMS.ASSETS.ICONS.LIKE} alt="like" />
        <span>Yes</span>
        <img src={constants.ENUMS.ASSETS.ICONS.DISLIKE} alt="dislike" />
        <span>No</span>
        {currentUser?._id === user._id && (
          <DeleteButton
            item={review._id}
            onClickDelete={handleDeleteReview}
            small={true}
          />
        )}
      </div>
    </div>
  );
};
