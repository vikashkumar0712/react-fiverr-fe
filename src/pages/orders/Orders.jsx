import "./Orders.scss";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { newRequest } from "../../utils/request";
import { Loader } from "../../components/loader/Loader";
import { ChatButton } from "../../components/chat_button/ChatButton";
import utility from "../../utils/utility";
import constants from "../../common/constants";

export const Orders = () => {
  const [prevErrorMessage, setPrevErrorMessage] = useState(null);

  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE.CURRENT_USER)
  );

  const {
    isLoading,
    error,
    data: orders,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data: response } = await newRequest.get(`/orders`);
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

  const handleContact = async (order) => {
    const { sellerId, buyerId } = order;

    try {
      const { data: response } = await newRequest.get(
        `/conversation/${sellerId}/${buyerId}`
      );

      navigate(`${constants.ROUTES.MESSAGE}${response.data._id}`);
    } catch (error) {
      if (error.response.status === constants.RESP_ERR_CODES.ERR_404) {
        const conversationData = {
          to: currentUser?.isSeller ? buyerId : sellerId,
        };

        const { data: response } = await newRequest.post(
          `/conversation`,
          conversationData
        );

        navigate(`${constants.ROUTES.MESSAGE}${response.data._id}`);
      } else {
        if (error.code === constants.RESP_ERR_CODES.ERR_NETWORK) {
          toast.error(constants.ERROR_MESSAGES.NOT_AUTHORIZED);
        } else {
          console.error(error);
          toast.error(error?.response?.data?.error || error.message);
        }
      }
    }
  };

  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <hr />
        {isLoading ? (
          <div className="loading">
            <Loader />
            <h3>Loading...</h3>
          </div>
        ) : error ? (
          <h3 className="error">Something went wrong!</h3>
        ) : orders.length === 0 ? (
          <h3 className="empty">No Orders Found!</h3>
        ) : (
          <table>
            <thead>
              <tr>
                <th>COVER</th>
                <th>TITLE</th>
                <th>PRICE</th>
                <th>TIMELINE</th>
                <th>PROFILE</th>
                <th>{currentUser?.isSeller ? "BUYER" : "SELLER"}</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>
                      <Link
                        className="link"
                        to={`${constants.ROUTES.GIG}${order.gigId}`}
                      >
                        <img
                          src={order.img}
                          alt="gig-cover-image"
                          className="gig-image"
                        />
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="link"
                        to={`${constants.ROUTES.GIG}${order.gigId}`}
                      >
                        {order?.title?.substring(0, 60)}...
                      </Link>
                    </td>
                    <td>₹ {order.price}</td>
                    <td>{utility.timeAgo(order.createdAt)}</td>
                    <td>
                      <img
                        src={order.userDetails.img}
                        alt="profile-image"
                        className="profile-image"
                      />
                    </td>
                    <td>{order.userDetails.username}</td>
                    <td>
                      <ChatButton item={order} onClickChat={handleContact} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
