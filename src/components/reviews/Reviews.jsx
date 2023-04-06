import "./Reviews.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Review } from "../review/Review";
import { newRequest } from "../../utils/request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "../loader/Loader";
import constants from "../../common/constants";

export const Reviews = ({ gigId }) => {
  const initialReviewValues = {
    gigId: gigId,
    star: 1,
    desc: "",
  };
  const [review, setReview] = useState(initialReviewValues);
  const [prevErrorMessage, setPrevErrorMessage] = useState(null);

  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: reviews,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data: response } = await newRequest.get(
        `/services/reviews/${gigId}`
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (error) {
      const newErrorMessage = error.response.data.error;
      if (newErrorMessage && newErrorMessage !== prevErrorMessage) {
        toast.error(newErrorMessage);
        setPrevErrorMessage(newErrorMessage);
      }
    }
  }, [error, prevErrorMessage]);

  const mutation = useMutation({
    mutationFn: async (reviewParams) => {
      await newRequest.post("/review", reviewParams);
    },
    onSuccess: () => queryClient.invalidateQueries(["reviews"]),
  });

  const handleReview = (e) => {
    const { name, value } = e.target;
    const handleChange = { ...review, [name]: value };
    setReview(handleChange);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(review);
      setReview(initialReviewValues);
    } catch (error) {
      if (error.code === constants.RESP_ERR_CODES.ERR_NETWORK) {
        toast.error(constants.ERROR_MESSAGES.NOT_AUTHORIZED);
      } else {
        console.error(error);
        toast.error(error?.response?.data?.error || error.message);
      }
    }
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading ? (
        <div className="loading">
          <Loader />
          <h3>Loading...</h3>
        </div>
      ) : error ? (
        <h3 className="error">Something went wrong!</h3>
      ) : reviews.length === 0 ? (
        <h3 className="empty">No Reviews Found!</h3>
      ) : (
        reviews.map((review) => <Review review={review} key={review._id} />)
      )}
      <div className="add-review">
        <h3>Write a review</h3>
        <form className="review-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="desc"
            placeholder="Share your opinion about this gig."
            value={review.desc}
            onChange={handleReview}
            required
          />
          <select name="star" onChange={handleReview}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button type="submit">Submit</button>
        </form>
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
