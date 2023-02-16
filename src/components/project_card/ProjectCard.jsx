import "./ProjectCard.scss";
import React from "react";
import { Link } from "react-router-dom";

export const ProjectCard = ({ item }) => {
  return (
    <Link to={`/`} className="link">
      <div className="project-card">
        <img src={item.img} alt={item.cat} />
        <div className="info">
          <img src={item.pp} alt="profile-picture" />
          <div className="texts">
            <h2>{item.cat}</h2>
            <span>{item.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
