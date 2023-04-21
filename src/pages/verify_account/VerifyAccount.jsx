import "./VerifyAccount.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { newRequest } from "../../utils/request";
import { Loader } from "../../components/loader/Loader";
import constants from "../../common/constants";

export const VerifyAccount = () => {
  const navigate = useNavigate();
  const { hash } = useParams();

  useEffect(() => {
    const VerifyNewAccount = async () => {
      if (hash.length <= 24 && hash.length >= 24) {
        try {
          const hashParams = { hash: hash };
          await newRequest.post(`services/verify-link`, hashParams);

          toast.success(constants.SUCCESS_MESSAGES.ACCOUNT_VERIFIED);
          navigate(constants.ROUTES.HOME);
        } catch (error) {
          console.error(error);
          toast.error(error.response.data.error || error.message);
          navigate(constants.ROUTES.HOME);
        }
      } else {
        navigate(constants.ROUTES.HOME);
      }
    };
    VerifyNewAccount();
  }, [hash]);

  return (
    <div className="verify-account">
      <form>
        <div className="header">
          <Loader />
          <label className="title">
            <b>Verifying</b> please wait...
          </label>
        </div>
      </form>
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
