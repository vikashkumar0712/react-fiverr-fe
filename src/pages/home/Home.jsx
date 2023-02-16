import "./Home.scss";
import  React from "react";
import { Featured } from "../../components/featured/Featured";
import { TrustedBy } from "../../components/trusted_by/TrustedBy";
export const Home = () => {
  return (
    <div className="home">
      <Featured/>
      <TrustedBy/>
    </div>
  )
}
