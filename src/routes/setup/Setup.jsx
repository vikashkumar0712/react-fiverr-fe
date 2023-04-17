import React from "react";
import constants from "../../common/constants";
import { Navigate } from "react-router-dom";

export const Setup = ({ Component, isAllowedWithoutLogin = false }) => {
  const currentUser = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE.CURRENT_USER)
  );

  const isProfileSetupComplete = currentUser
    ? currentUser?.createdAt !== currentUser?.updatedAt
    : isAllowedWithoutLogin;

  return isProfileSetupComplete ? (
    Component
  ) : (
    <Navigate to={constants.ROUTES.SETUP_ACCOUNT} />
  );
};
