import "./Dialog.scss";
import React from "react";
import { Emoji } from "../emoji/Emoji";
import { Flag } from "../flag/Flag";
import { Link, useNavigate } from "react-router-dom";
import utility from "../../utils/utility";
import constants from "../../common/constants";

export const Dialog = ({ user, onClickLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="dialog">
      <span className="disable">
        <b>{utility.getGreet()}</b>
        <Emoji />
      </span>

      <span
        className="option"
        onClick={() => navigate(`${constants.ROUTES.ACCOUNT}${user.username}`)}
      >
        <img className="dialog-image" src={user.img} alt="profile-picture" />
        &nbsp;&nbsp;
        {utility.toTitleCase(user.username)}&nbsp;&nbsp;
        <Flag country={user.country} />
      </span>

      <hr />
      <span className="email" style={{ cursor: "text" }}>
        {user.email}
      </span>
      <hr />

      {user.isSeller && (
        <Link
          className="link option"
          to={constants.ROUTES.ADD}
          style={{ paddingTop: "1.1%", paddingBottom: "1.1%" }}
        >
          <img
            className="icon"
            src={constants.ENUMS.ASSETS.ICONS.ADD}
            alt="add-gig"
            style={{
              width: "17px",
              height: "17px",
              margin: "1%",
            }}
          />
          &nbsp; Add Gig
        </Link>
      )}
      <Link className="link option" to={constants.ROUTES.ORDERS}>
        <img
          className="icon"
          src={constants.ENUMS.ASSETS.ICONS.ORDERS}
          alt="orders"
          style={{
            width: "25px",
            height: "25px",
            marginLeft: "-1.5%",
          }}
        />
        &nbsp; Orders
      </Link>
      <Link
        className="link option"
        to={constants.ROUTES.MESSAGES}
        style={{ paddingTop: "1.1%", paddingBottom: "1.1%" }}
      >
        <img
          className="icon"
          src={constants.ENUMS.ASSETS.ICONS.MESSAGES}
          alt="messages"
          style={{ width: "20px", height: "20px" }}
        />
        &nbsp; Messages
      </Link>
      <hr />
      <Link
        className="link option"
        onClick={() => onClickLogout()}
        style={{ paddingTop: "1.1%", paddingBottom: "1.1%" }}
      >
        <img
          className="icon"
          src={constants.ENUMS.ASSETS.ICONS.EXIT}
          alt="sign-out"
          style={{
            width: "17px",
            height: "17px",
            marginLeft: "1.6%",
          }}
        />
        &nbsp; Sign out
      </Link>
    </div>
  );
};
