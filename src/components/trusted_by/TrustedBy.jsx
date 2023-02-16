import "./TrustedBy.scss";
import React from "react";
import constants from "../../common/constants";

export const TrustedBy = () => {
  return (
    <div className="trusted-by">
      <div className="container">
        <span>Trusted by:</span>
        <img
          src={constants.ENUMS.ASSETS.TRUSTED_BY.FACEBOOK_LOGO}
          alt="facebook-logo"
        />
        <img
          src={constants.ENUMS.ASSETS.TRUSTED_BY.GOOGLE_LOGO}
          alt="google-logo"
        />
        <img
          src={constants.ENUMS.ASSETS.TRUSTED_BY.NETFLIX_LOGO}
          alt="netflix-logo"
        />
        <img src={constants.ENUMS.ASSETS.TRUSTED_BY.PNG} alt="p&g-logo" />
        <img
          src={constants.ENUMS.ASSETS.TRUSTED_BY.PAYPAL_LOGO}
          alt="paypal-logo"
        />
      </div>
    </div>
  );
};
