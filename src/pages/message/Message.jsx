import "./Message.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../utils/request";
import { Loader } from "../../components/loader/Loader";
import constants from "../../common/constants";
import utility from "../../utils/utility";

export const Message = () => {
  const { id } = useParams();

  const initialMessage = { conversationId: id, desc: "" };

  const [message, setMessage] = useState(initialMessage);
  const [prevErrorMessage, setPrevErrorMessage] = useState(null);
  const [receiver, setReceiver] = useState("Loading...");

  const queryClient = useQueryClient();

  const currentUser = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE.CURRENT_USER)
  );

  const {
    isLoading,
    error,
    data: messages,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data: response } = await newRequest.get(`/messages/${id}`);
      return response.data;
    },
  });

  useEffect(() => {
    const fetcherReceiver = async () => {
      try {
        const { data: response } = await newRequest.get(
          `conversation-receiver/${id}`
        );
        setReceiver(response.data);
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.error || error.message);
      }
    };

    if (error) {
      const newErrorMessage = error.response.data.error;
      if (newErrorMessage && newErrorMessage !== prevErrorMessage) {
        toast.error(newErrorMessage);
        setPrevErrorMessage(newErrorMessage);
      }
    }

    fetcherReceiver();
  }, [error, prevErrorMessage]);

  const mutation = useMutation({
    mutationFn: async (message) => {
      await newRequest.post(`/message`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleMessage = (e) => {
    const { name, value } = e.target;
    const handleChange = { ...message, [name]: value };
    setMessage(handleChange);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(message);
      setMessage(initialMessage);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || error.message);
    }
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to={`/messages`} className="link">
            <img
              className="icon"
              src={constants.ENUMS.ASSETS.ICONS.MESSAGES}
              alt="messages"
              style={{ width: "20px", height: "20px" }}
            />
          </Link>
          &nbsp;&nbsp;&#47;&nbsp;&nbsp;
          <img src={receiver?.img} alt="profile-picture" />
          &nbsp; &nbsp;
          <h3>
            {receiver?.username
              ? utility.toTitleCase(receiver?.username)
              : receiver}
          </h3>
        </span>
        <div className="messages">
          {isLoading ? (
            <div className="loading">
              <Loader />
              <h3>Loading...</h3>
            </div>
          ) : error ? (
            <h3 className="error">Something went wrong!</h3>
          ) : messages.length === 0 ? (
            <h3 className="empty">No Messages Found!</h3>
          ) : (
            messages.map((message) => {
              return (
                <div
                  className={
                    message.userId === currentUser?._id ? "owner item" : "item"
                  }
                  key={message._id}
                >
                  <img src={message.userDetails.img} alt="profile-picture" />
                  <p>{message.desc}</p>
                </div>
              );
            })
          )}
        </div>
        <hr />
        <form className="write" onSubmit={handleSend}>
          <textarea
            name="desc"
            placeholder="write a message"
            id="desc"
            cols="30"
            rows="10"
            value={message.desc}
            onChange={handleMessage}
            required
          ></textarea>
          <button className="bt" type="submit">
            <span className="msg"></span>
            SEND
          </button>
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
