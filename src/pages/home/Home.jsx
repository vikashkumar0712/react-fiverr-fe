import "./Home.scss";
import  React from "react";
import { cards } from "../../common/data";
import { Featured } from "../../components/featured/Featured";
import { TrustedBy } from "../../components/trusted_by/TrustedBy";
import { Slider } from "../../components/slider/Slider";
import { CatCard } from "../../components/cat_card/CatCard";
export const Home = () => {
  return (
    <div className="home">
      <Featured/>
      <TrustedBy/>
      <Slider slidesToShow={5} arrowsScroll={5}>
         {cards.map((card) => (
            <CatCard item={card} key={card.id} />
          ))}
      </Slider>
    </div>
  )
}
