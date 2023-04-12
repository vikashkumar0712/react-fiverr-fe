import "./Gigs.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../utils/request";
import { GigCard } from "../../components/gig_card/GigCard";
import { Link, useLocation } from "react-router-dom";
import { Loader } from "../../components/loader/Loader";
import constants from "../../common/constants";
import utility from "../../utils/utility";

export const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [orderBy, setOrderBy] = useState(constants.ENUMS.ORDER_BY.BEST_SELLING);
  const [prevErrorMessage, setPrevErrorMessage] = useState(null);
  const [favorites, setFavorites] = useState({});

  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();
  const { search: searchTerm, cat: categoryTerm } =
    utility.urlParamsToObject(search);

  const currentUser = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE.CURRENT_USER)
  );

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

  const fetchFavorites = async () => {
    const { data: response } = await newRequest.get("favorites");

    const favorites = Object.fromEntries(
      response.data.map((favorite) => [favorite.gigId, true])
    );

    setFavorites({ ...favorites });
  };

  useEffect(() => {
    orderBy && refetch();
    searchTerm && refetch();
    categoryTerm && refetch();

    if (currentUser?.isSeller === false) fetchFavorites();

    if (error) {
      const newErrorMessage = error.response.data.error;

      if (newErrorMessage && newErrorMessage !== prevErrorMessage) {
        toast.error(newErrorMessage);
        setPrevErrorMessage(newErrorMessage);
      }
    }
  }, [error, prevErrorMessage, orderBy, searchTerm, categoryTerm]);

  const handleClick = () => setOpen(!open);

  const handleOrderBy = (type) => {
    setOrderBy(type);
    setOpen(false);
  };

  const handleApply = () => refetch();

  const handleFavoriteAdd = async (params) => {
    try {
      await newRequest.post("/favorite", params);
      fetchFavorites();
    } catch (error) {
      if (error.code === constants.RESP_ERR_CODES.ERR_NETWORK) {
        toast.error(constants.ERROR_MESSAGES.NOT_AUTHORIZED);
      } else {
        console.error(error);
        toast.error(error?.response?.data?.error || error.message);
      }
    }
  };

  const handleFavoriteRemove = async (id) => {
    try {
      await newRequest.post(`/favorite/${id}`);
      fetchFavorites();
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
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">
          <Link className="link" to={`/`}>
            <img
              className="icon"
              src={constants.ENUMS.ASSETS.ICONS.HOME}
              alt="home"
              style={{ width: "20px", height: "20px" }}
            />
          </Link>
          &nbsp;&nbsp;&#47;&nbsp;&nbsp;{utility.toCategoryCase(categoryTerm)}
        </span>
        <h1>{utility.toCategoryCase(categoryTerm)}</h1>
        <p>{utility.catToDesc(categoryTerm)}</p>
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
            gigs.map((gig) => (
              <GigCard
                gig={gig}
                isAdded={favorites[gig._id]}
                onClickAdd={handleFavoriteAdd}
                onClickRemove={handleFavoriteRemove}
                key={gig._id}
              />
            ))
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
