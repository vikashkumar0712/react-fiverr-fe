import "./Gig.scss";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Slider } from "infinite-react-carousel/lib";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { newRequest } from "../../utils/request";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../components/loader/Loader";
import { Reviews } from "../../components/reviews/Reviews";
import utility from "../../utils/utility";
import constants from "../../common/constants";
import { MagicButton } from "../../components/magic_button/MagicButton";

export const Gig = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [prevErrorMessage, setPrevErrorMessage] = useState(null);

  const currentUser = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE.CURRENT_USER)
  );

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: gig,
  } = useQuery({
    queryKey: ["gig"],
    queryFn: async () => {
      const { data: response } = await newRequest.get(`/services/gig/${id}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (searchParams.has("success")) {
      searchParams.delete("success");
      setSearchParams(searchParams);
      toast(constants.SUCCESS_MESSAGES.ORDER_SUCCESS);
      setTimeout(() => navigate(constants.ROUTES.ORDERS), 4000);
    }

    if (searchParams.has("canceled")) {
      searchParams.delete("canceled");
      setSearchParams(searchParams);
      toast.warn(constants.ERROR_MESSAGES.ORDER_CANCEL);
    }

    if (error) {
      const newErrorMessage = error.response.data.error;
      if (newErrorMessage && newErrorMessage !== prevErrorMessage) {
        toast.error(newErrorMessage);
        setPrevErrorMessage(newErrorMessage);
      }
    }
  }, [error, prevErrorMessage]);

  const user = gig && gig.userDetails;

  const stars =
    gig && !isNaN(gig.totalStars / gig.starNumber)
      ? Math.round(gig.totalStars / gig.starNumber)
      : 0;

  const starsCount = new Array(stars).fill("star");

  const handleCheckout = async () => {
    try {
      const checkoutParams = { gigId: id };
      const { data: response } = await toast.promise(
        newRequest.post(`order/checkout`, checkoutParams),
        constants.PARAMS.PAYMENT_PROCESSING
      );

      const stripePaymentUrl = response.data;
      setTimeout(() => (window.location.href = stripePaymentUrl), 4000);
    } catch (error) {
      if (error.code === constants.RESP_ERR_CODES.ERR_NETWORK) {
        toast.error(constants.ERROR_MESSAGES.NOT_AUTHORIZED);
      } else {
        console.error(error);
        toast.error(error?.response?.data?.error || error.message);
      }
    }
  };

  const handleContact = async () => {
    const sellerId = user._id;
    const buyerId = currentUser
      ? currentUser?._id
      : toast.error(constants.ERROR_MESSAGES.NOT_AUTHORIZED);

    if (currentUser.isSeller !== true && buyerId !== sellerId) {
      try {
        const { data: response } = await newRequest.get(
          `/conversation/${sellerId}/${buyerId}`
        );

        navigate(`/message/${response.data._id}`);
      } catch (error) {
        if (error.response.status === constants.RESP_ERR_CODES.ERR_404) {
          const conversationData = {
            to: currentUser?.isSeller ? buyerId : sellerId,
          };

          const { data: response } = await newRequest.post(
            `/conversation`,
            conversationData
          );

          navigate(`/message/${response.data._id}`);
        } else {
          if (error.code === constants.RESP_ERR_CODES.ERR_NETWORK) {
            toast.error(constants.ERROR_MESSAGES.NOT_AUTHORIZED);
          } else {
            console.error(error);
            toast.error(error?.response?.data?.error || error.message);
          }
        }
      }
    } else {
      toast.error(constants.ERROR_MESSAGES.NOT_AUTHORIZED);
    }
  };

  return (
    <div className="gig">
      {isLoading ? (
        <div className="loading">
          <Loader />
          <h3>Loading...</h3>
        </div>
      ) : error ? (
        <h3 className="error">Something went wrong!</h3>
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Fiverr &gt; {utility.toCategoryCase(gig.cat)}
            </span>
            <h1>{gig.title}</h1>
            <div className="user">
              <img className="pp" src={user.img} alt="profile-picture" />
              <div className="verified">
                <img
                  className="icon"
                  src={constants.ENUMS.ASSETS.ICONS.VERIFIED}
                  alt="orders"
                  style={{ width: "12px", height: "12px" }}
                />
              </div>
              <span>{user.username}</span>

              <div className="stars">
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

            <Slider slidesToShow={1} arrowsScroll={1}>
              {gig.images.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={`${image}?x=${Date.now()}`}
                    alt={`image-${index + 1}`}
                  />
                );
              })}
            </Slider>

            <h2>About This Gig</h2>
            <p>{gig.desc}</p>
            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img src={user.img} alt="profile-picture" />
                <div className="verified">
                  <img
                    className="icon"
                    src={constants.ENUMS.ASSETS.ICONS.VERIFIED}
                    alt="orders"
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
                <div className="info">
                  <span>{user.username}</span>
                  <div className="stars">
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
                  <button onClick={handleContact}>Contact Me</button>
                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="desc">{user.country}</span>
                  </div>
                  <div className="item">
                    <span className="title">Member since</span>
                    <span className="desc">
                      {utility.timeStampToDate(user.createdAt)}
                    </span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">4 hours</span>
                  </div>
                  <div className="item">
                    <span className="title">Last delivery</span>
                    <span className="desc">
                      {gig.lastDelivery
                        ? utility.timeAgo(gig.lastDelivery)
                        : "No last delivery available!"}
                    </span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                  </div>
                </div>
                <hr />
                <p>{user.desc}</p>
              </div>
            </div>
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{gig.shortTitle.substring(0, 33)}...</h3>
              <h2>₹ {gig.price}</h2>
            </div>
            <p>{gig.shortDesc.substring(0, 168)}...</p>
            <div className="details">
              <div className="item">
                <img src={constants.ENUMS.ASSETS.ICONS.CLOCK} alt="clock" />
                <span>{gig.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src={constants.ENUMS.ASSETS.ICONS.RECYCLE} alt="recycle" />
                <span>{gig.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {gig.features.map((feature, index) => {
                return (
                  <div className="item" key={index}>
                    <img
                      src={constants.ENUMS.ASSETS.ICONS.GREEN_CHECK}
                      alt="green-check"
                    />
                    <span>{feature}</span>
                  </div>
                );
              })}
            </div>
            <MagicButton
              text={`Checkout ( ₹ ${gig.price} )`}
              onClick={handleCheckout}
            />
          </div>
        </div>
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
