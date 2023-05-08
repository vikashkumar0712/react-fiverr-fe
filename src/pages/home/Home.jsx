import "./Home.scss";
import React, { useEffect } from "react";
import { cards, projects } from "../../common/data";
import { HeroSection } from "../../components/hero_section/HeroSection";
import { TrustedBy } from "../../components/trusted_by/TrustedBy";
import { Slider } from "../../components/slider/Slider";
import { CatCard } from "../../components/cat_card/CatCard";
import { FeaturesPromo } from "../../components/features_promo/FeaturesPromo";
import { FeaturesBusiness } from "../../components/features_business/FeaturesBusiness";
import { ProjectCard } from "../../components/project_card/ProjectCard";
import { newRequest } from "../../utils/request";
export const Home = () => {
  useEffect(async () => {
    await newRequest.get();
  }, []);

  return (
    <div className="home">
      <HeroSection />
      <TrustedBy />
      <Slider slidesToShow={5} arrowsScroll={5}>
        {cards.map((catCard) => (
          <CatCard item={catCard} key={catCard.id} />
        ))}
      </Slider>
      <FeaturesPromo />
      <FeaturesBusiness />
      <Slider slidesToShow={4} arrowsScroll={4}>
        {projects.map((projectCard) => (
          <ProjectCard item={projectCard} key={projectCard.id} />
        ))}
      </Slider>
    </div>
  );
};
