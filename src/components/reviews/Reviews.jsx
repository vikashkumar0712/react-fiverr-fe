import "./Reviews.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Review } from "../review/Review";
import { newRequest } from "../../utils/request";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../loader/Loader";

export const Reviews = ({ gigId }) => {
  const [prevErrorMessage, setPrevErrorMessage] = useState(null);

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
      ) : (
        reviews.map((review) => <Review review={review} key={review._id} />)
      )}
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
