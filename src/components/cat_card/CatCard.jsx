import "./CatCard.scss";
import React from "react";
import { Link } from "react-router-dom";
import constants from "../../common/constants";

export const CatCard = ({ item }) => {
  return (
    <Link to={`${constants.ROUTES.GIGS}?cat=${item.cat}`}>
      <div className="cat-card">
        <img src={item.img} alt={item.title} />
        <span className="desc">{item.desc}</span>
        <span className="title">{item.title}</span>
      </div>
    </Link>
  );
};
