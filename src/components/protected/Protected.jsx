import React from "react";
import constants from "../../common/constants";
import { Navigate } from "react-router-dom";

export const Protected = ({ Component }) => {
  const currentUser = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE.CURRENT_USER)
  );

  return currentUser?.isSeller ? (
    Component
  ) : (
    <Navigate to={constants.ROUTES.HOME} />
  );
};
