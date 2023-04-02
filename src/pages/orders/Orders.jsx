import "./Orders.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../utils/request";
import { Loader } from "../../components/loader/Loader";
import constants from "../../common/constants";
import { Link, useNavigate } from "react-router-dom";
import utility from "../../utils/utility";

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

      navigate(`/message/${response.data._id}`);
    } catch (error) {
      if (error.response.status === constants.RESP_ERR_CODES.ERR_404) {
        const conversationData = {
          to: currentUser.isSeller ? buyerId : sellerId,
        };

        const { data: response } = await newRequest.post(
          `conversation`,
          conversationData
        );

        navigate(`/message/${response.data._id}`);
      } else {
        console.error(error);
        toast.error(error?.response?.data?.error || error.message);
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
                <th>{currentUser?.isSeller ? "BUYER" : "SELLER"}</th>
                <th>TITLE</th>
                <th>PRICE</th>
                <th>TIMELINE</th>
                <th>MESSAGE</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>
                      <Link className="link" to={`/gig/${order.gigId}`}>
                        <img
                          src={order.img}
                          alt="gig-cover-image"
                          className="gig-image"
                        />
                      </Link>
                    </td>
                    <td>{order.userDetails.username}</td>
                    <td>
                      <Link className="link" to={`/gig/${order.gigId}`}>
                        {order.title}
                      </Link>
                    </td>
                    <td>₹ {order.price}</td>
                    <td>{utility.timeAgo(order.createdAt)}</td>
                    <td>
                      <img
                        src={constants.ENUMS.ASSETS.ICONS.CHAT}
                        alt="message"
                        className="message"
                        onClick={() => handleContact(order)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
