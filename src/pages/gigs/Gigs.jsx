import "./Gigs.scss";
import React, { useState } from "react";
import constants from "../../common/constants";
import { gigs } from "../../common/data";
import { GigCard } from "../../components/gig_card/GigCard";
export const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState(constants.ENUMS.SORT.BEST_SELLING);

  const handleClick = () => setOpen(!open);
  const handleSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">FIVERR &gt; GRAPHICS & DESIGN &gt;</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr&apos;s AI
          artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budged</span>
            <input type="text" placeholder="min" />
            <input type="text" placeholder="max" />
            <button>Apply</button>
          </div>
          <div className="right">
            <span className="sort-by">SortBy</span>
            <span className="sort-type">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              src={constants.ENUMS.ASSETS.ICONS.DOWN}
              alt="down"
              onClick={handleClick}
            />
            {open && (
              <div className="right-menu">
                {sort === constants.ENUMS.SORT.BEST_SELLING ? (
                  <span onClick={() => handleSort(constants.ENUMS.SORT.NEWEST)}>
                    Newest
                  </span>
                ) : (
                  <span
                    onClick={() =>
                      handleSort(constants.ENUMS.SORT.BEST_SELLING)
                    }
                  >
                    Best selling
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {gigs.map((gigCard) => (
            <GigCard item={gigCard} key={gigCard.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
