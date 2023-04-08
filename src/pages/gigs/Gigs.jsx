import "./Gigs.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../utils/request";
import { GigCard } from "../../components/gig_card/GigCard";
import { useLocation } from "react-router-dom";
import { Loader } from "../../components/loader/Loader";
import constants from "../../common/constants";
import utility from "../../utils/utility";

export const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [orderBy, setOrderBy] = useState(constants.ENUMS.ORDER_BY.BEST_SELLING);
  const [prevErrorMessage, setPrevErrorMessage] = useState(null);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const {
    isLoading,
    error,
    data: gigs,
    refetch,
  } = useQuery({
    queryKey: ["gigs"],
    queryFn: async () => {
      const queryParams = utility.urlParamsToObject(search);

      const filters = {
        ...queryParams,
        ...(minRef?.current?.value && { min: minRef.current.value }),
        ...(maxRef?.current?.value && { max: maxRef.current.value }),
        ...(orderBy && { orderBy: orderBy }),
      };

      const { data: response } = await newRequest.post(
        "/services/gigs",
        filters
      );
      return response.data;
    },
  });

  useEffect(() => {
    orderBy && refetch();
    if (error) {
      const newErrorMessage = error.response.data.error;
      if (newErrorMessage && newErrorMessage !== prevErrorMessage) {
        toast.error(newErrorMessage);
        setPrevErrorMessage(newErrorMessage);
      }
    }
  }, [error, prevErrorMessage, orderBy]);

  const handleClick = () => setOpen(!open);

  const handleOrderBy = (type) => {
    setOrderBy(type);
    setOpen(false);
  };

  const handleApply = () => refetch();

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">FIVERR &gt; GRAPHICS & DESIGN</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr&apos;s AI
          artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={handleApply}>Apply</button>
          </div>
          <div className="right">
            <span className="sort-by">SortBy</span>
            <span className="sort-type">
              {orderBy === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              src={constants.ENUMS.ASSETS.ICONS.DOWN}
              alt="down"
              onClick={handleClick}
            />
            {open && (
              <div className="right-menu">
                {orderBy === constants.ENUMS.ORDER_BY.BEST_SELLING ? (
                  <span
                    onClick={() =>
                      handleOrderBy(constants.ENUMS.ORDER_BY.NEWEST)
                    }
                  >
                    Newest
                  </span>
                ) : (
                  <span
                    onClick={() =>
                      handleOrderBy(constants.ENUMS.ORDER_BY.BEST_SELLING)
                    }
                  >
                    Best selling
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {isLoading ? (
            <div className="loading">
              <Loader />
              <h3>Loading...</h3>
            </div>
          ) : error ? (
            <h3 className="error">Something went wrong!</h3>
          ) : gigs.length === 0 ? (
            <h3 className="empty">No Gigs Found!</h3>
          ) : (
            gigs.map((gig) => <GigCard gig={gig} key={gig._id} />)
          )}
        </div>
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
