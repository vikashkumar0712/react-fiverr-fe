import "./Review.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import utility from "../../utils/utility";
import { newRequest } from "../../utils/request";
import constants from "../../common/constants";

export const Review = ({ review }) => {
  const queryClient = useQueryClient();

  const currentUser = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE.CURRENT_USER)
  );

  const mutation = useMutation({
    mutationFn: async (id) => {
      await newRequest.post(`/review/${id}`);
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
        {currentUser._id === user._id && (
          <img
            src={constants.ENUMS.ASSETS.ICONS.DELETE}
            alt="delete"
            onClick={() => handleDeleteReview(review._id)}
          />
        )}
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
