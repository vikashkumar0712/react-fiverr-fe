import "./CatCard.scss";
import React from "react";
import { Link } from "react-router-dom";

export const CatCard = ({ item }) => {
  return (
    <Link to={`/gigs?cat=design`}>
      <div className="cat-card">
        <img src={item.img} alt={item.title} />
        <span className="desc">{item.desc}</span>
        <span className="title">{item.title}</span>
      </div>
    </Link>
  );
};
