import "./Messages.scss";
import { toast } from "react-toastify";
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
      if (error.code === constants.RESP_ERR_CODES.ERR_NETWORK) {
        toast.error(constants.ERROR_MESSAGES.NOT_AUTHORIZED);
      } else {
        console.error(error);
        toast.error(error?.response?.data?.error || error.message);
      }
    }
  };

  const isSeen = (conversation) =>
    (currentUser.isSeller && !conversation.readBySeller) ||
    (!currentUser.isSeller && !conversation.readByBuyer);

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
            <thead>
              <tr>
                <th>PROFILE</th>
                <th>{currentUser.isSeller ? "BUYER" : "SELLER"}</th>
                <th>MASSAGE</th>
                <th>TIMELINE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {conversations.map((conversation) => {
                return (
                  <tr
                    className={
                      isSeen(conversation) && conversation?.lastMessage
                        ? "active"
                        : undefined
                    }
                    key={conversation._id}
                  >
                    <td>
                      <img
                        src={conversation.userDetails.img}
                        alt="profile-picture"
                      />
                    </td>
                    <td>{conversation.userDetails.username}</td>
                    <td>
                      <Link
                        to={`${constants.ROUTES.MESSAGE}${conversation._id}`}
                        className="link"
                        style={{
                          color: conversation?.lastMessage ? "green" : "gray",
                        }}
                        onClick={() =>
                          isSeen(conversation) &&
                          conversation?.lastMessage &&
                          handleMarkAsRead(conversation._id)
                        }
                      >
                        {conversation?.lastMessage
                          ? `${conversation?.lastMessage?.substring(0, 100)}...`
                          : `Don't be shy! Say Hiii ;)`}
                      </Link>
                    </td>
                    <td>{utility.timeAgo(conversation.updatedAt)}</td>
                    <td>
                      {isSeen(conversation) && conversation?.lastMessage ? (
                        <button>SEEN</button>
                      ) : (
                        <button className="button-disabled">NOT SEEN</button>
                      )}
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
