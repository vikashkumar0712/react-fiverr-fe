import "./Gig.scss";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Slider } from "infinite-react-carousel/lib";
import { useParams } from "react-router-dom";
import { newRequest } from "../../utils/request";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../components/loader/loader";
import constants from "../../common/constants";
export const Gig = () => {
  const [prevErrorMessage, setPrevErrorMessage] = useState(null);

  const { id } = useParams();

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

  const starsCount = new Array(stars > 0 ? stars : 1).fill("star");

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
              Liverr &gt; Graphics & Design &gt;
            </span>
            <h1>{gig.title}</h1>
            <div className="user">
              <img className="pp" src={user.img} alt="profile-picture" />
              <span>{user.username}</span>
              <div className="stars">
                {starsCount.map((_star, index) => {
                  return (
                    <img
                      key={index}
                      src={constants.ENUMS.ASSETS.ICONS.STAR}
                      alt={`star-${index + 1}`}
                    />
                  );
                })}
                <span>{stars}</span>
              </div>
            </div>

            <Slider slidesToShow={1} arrowsScroll={1}>
              {gig.images.map((image, index) => {
                return (
                  <img key={index} src={image} alt={`image-${index + 1}`} />
                );
              })}
            </Slider>

            <h2>About This Gig</h2>
            <p>{gig.desc}</p>
            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img src={user.img} alt="profile-picture" />
                <div className="info">
                  <span>{user.username}</span>
                  <div className="stars">
                    {starsCount.map((_star, index) => {
                      return (
                        <img
                          key={index}
                          src={constants.ENUMS.ASSETS.ICONS.STAR}
                          alt={`star-${index + 1}`}
                        />
                      );
                    })}
                    <span>{stars}</span>
                  </div>
                  <button>Contact Me</button>
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
                    <span className="desc">Aug 2022</span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">4 hours</span>
                  </div>
                  <div className="item">
                    <span className="title">Last delivery</span>
                    <span className="desc">1 day</span>
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
            <div className="reviews">
              <h2>Reviews</h2>
              <div className="item">
                <div className="user">
                  <img
                    className="pp"
                    src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <div className="info">
                    <span>Garner David</span>
                    <div className="country">
                      <img
                        src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                        alt=""
                      />
                      <span>United States</span>
                    </div>
                  </div>
                </div>
                <div className="stars">
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <span>5</span>
                </div>
                <p>
                  I just want to say that art_with_ai was the first, and after
                  this, the only artist Ill be using on Fiverr. Communication
                  was amazing, each and every day he sent me images that I was
                  free to request changes to. They listened, understood, and
                  delivered above and beyond my expectations. I absolutely
                  recommend this gig, and know already that Ill be using it
                  again very very soon
                </p>
                <div className="helpful">
                  <span>Helpful?</span>
                  <img src={constants.ENUMS.ASSETS.ICONS.LIKE} alt="like" />
                  <span>Yes</span>
                  <img
                    src={constants.ENUMS.ASSETS.ICONS.DISLIKE}
                    alt="dislike"
                  />
                  <span>No</span>
                </div>
              </div>
              <hr />
              <div className="item">
                <div className="user">
                  <img
                    className="pp"
                    src="https://images.pexels.com/photos/4124367/pexels-photo-4124367.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <div className="info">
                    <span>Sidney Owen</span>
                    <div className="country">
                      <img
                        src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png"
                        alt=""
                      />
                      <span>Germany</span>
                    </div>
                  </div>
                </div>
                <div className="stars">
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <span>5</span>
                </div>
                <p>
                  The designer took my photo for my book cover to the next
                  level! Professionalism and ease of working with designer along
                  with punctuality is above industry standards!! Whatever your
                  project is, you need this designer!
                </p>
                <div className="helpful">
                  <span>Helpful?</span>
                  <img src={constants.ENUMS.ASSETS.ICONS.LIKE} alt="like" />
                  <span>Yes</span>
                  <img
                    src={constants.ENUMS.ASSETS.ICONS.DISLIKE}
                    alt="dislike"
                  />
                  <span>No</span>
                </div>
              </div>
              <hr />
              <div className="item">
                <div className="user">
                  <img
                    className="pp"
                    src="https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <div className="info">
                    <span>Lyle Giles </span>
                    <div className="country">
                      <img
                        src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                        alt=""
                      />
                      <span>United States</span>
                    </div>
                  </div>
                </div>
                <div className="stars">
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <img src={constants.ENUMS.ASSETS.ICONS.STAR} alt="star" />
                  <span>5</span>
                </div>
                <p>
                  Amazing work! Communication was amazing, each and every day he
                  sent me images that I was free to request changes to. They
                  listened, understood, and delivered above and beyond my
                  expectations. I absolutely recommend this gig, and know
                  already that Ill be using it again very very soon
                </p>
                <div className="helpful">
                  <span>Helpful?</span>
                  <img src={constants.ENUMS.ASSETS.ICONS.LIKE} alt="like" />
                  <span>Yes</span>
                  <img
                    src={constants.ENUMS.ASSETS.ICONS.DISLIKE}
                    alt="dislike"
                  />
                  <span>No</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="price">
              <h3>{gig.shortTitle}</h3>
              <h2>$ {gig.price}</h2>
            </div>
            <p>{gig.shortDesc}</p>
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
            <button>Continue</button>
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
