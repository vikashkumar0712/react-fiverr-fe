import React from "react";
import constants from "../../common/constants";
import { Navigate } from "react-router-dom";

export const Protected = ({ Component, isSeller = true }) => {
  const currentUser = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE.CURRENT_USER)
  );

  const user = isSeller
    ? currentUser?.isSeller
    : currentUser?.isSeller === false;

  return user ? Component : <Navigate to={constants.ROUTES.HOME} />;
};
