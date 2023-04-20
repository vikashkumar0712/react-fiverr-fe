import "./VerifyAccount.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import constants from "../../common/constants";
import { newRequest } from "../../utils/request";

export const VerifyAccount = () => {
  const { hash } = useParams();

  useEffect(() => {
    const VerifyNewAccount = async () => {
      if (hash.length <= 24 && hash.length >= 24) {
        try {
          const hashParams = { hash: hash };
          await newRequest.post(`services/verify-link`, hashParams),
            toast.success("Account verified successfully");
          setTimeout(
            () => (window.location.href = constants.ROUTES.HOME),
            4000
          );
        } catch (error) {
          console.error(error);
          toast.error(error.response.data.error || error.message);
          setTimeout(
            () => (window.location.href = constants.ROUTES.HOME),
            4000
          );
        }
      } else {
        setTimeout(() => (window.location.href = constants.ROUTES.HOME), 4000);
      }
    };
    VerifyNewAccount();
  }, [hash]);

  return (
    <div>
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
