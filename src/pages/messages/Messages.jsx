import "./Messages.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { newRequest } from "../../utils/request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "../../components/loader/Loader";
import utility from "../../utils/utility";
import constants from "../../common/constants";

export const Messages = () => {
  const [prevErrorMessage, setPrevErrorMessage] = useState(null);

  const queryClient = useQueryClient();

  const currentUser = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE.CURRENT_USER)
  );

  const {
    isLoading,
    error,
    data: conversations,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const { data: response } = await newRequest.get(`/conversations`);
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
    mutationFn: async (id) => {
      const readParams = { id: id };
      await newRequest.post(`/conversation-read`, readParams);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleMarkAsRead = async (id) => {
    try {
      await mutation.mutateAsync(id);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || error.message);
    }
  };

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <hr />
        {isLoading ? (
          <div className="loading">
            <Loader />
            <h3>Loading...</h3>
          </div>
        ) : error ? (
          <h3 className="error">Something went wrong!</h3>
        ) : conversations.length === 0 ? (
          <h3 className="empty">No Messages Found!</h3>
        ) : (
          <table>
            <tr>
              <th>Profile Picture</th>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Timeline</th>
              <th>Action</th>
            </tr>
            {conversations.map((conversation) => {
              return (
                <tr
                  className={
                    (currentUser.isSeller && !conversation.readBySeller) ||
                    (!currentUser.isSeller && !conversation.readByBuyer)
                      ? "active"
                      : undefined
                  }
                  key={conversation._id}
                >
                  <td><img src={conversation.userDetails.img} alt="profile-picture" /></td>
                  <td>{conversation.userDetails.username}</td>
                  <td>
                    <Link to={`/message/${conversation._id}`} className="link">
                      {conversation?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{utility.timeAgo(conversation.updatedAt)}</td>
                  <td>
                    {(currentUser.isSeller && !conversation.readBySeller) ||
                    (!currentUser.isSeller && !conversation.readByBuyer) ? (
                      <button
                        onClick={() => handleMarkAsRead(conversation._id)}
                      >
                        Mark as read
                      </button>
                    ) : (
                      <button className="button-disabled">
                        Marked as read
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
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
