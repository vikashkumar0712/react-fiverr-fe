import React from "react";
import constants from "../../common/constants";
import { Navigate } from "react-router-dom";

export const Setup = ({
  Component,
  isAllowedWithLogin = false,
  isProfileAlreadySetup = false,
}) => {
  const currentUser = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE.CURRENT_USER)
  );

  if (isProfileAlreadySetup) {
    const isProfileSetupComplete = currentUser
      ? !currentUser?.completed
      : isAllowedWithLogin;

    return isProfileSetupComplete ? (
      Component
    ) : (
      <Navigate to={constants.ROUTES.HOME} />
    );
  } else {
    const isProfileSetupComplete = currentUser
      ? currentUser?.completed
      : isAllowedWithLogin;

    return isProfileSetupComplete ? (
      Component
    ) : (
      <Navigate to={constants.ROUTES.SETUP_ACCOUNT} />
    );
  }
};
