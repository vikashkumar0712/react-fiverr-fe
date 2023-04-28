import "./NotFound.scss";
import React from "react";
import { UploadGigs } from "../../components/upload_gigs/UploadGigs";
// import { MagicButton } from "../../components/magic_button/MagicButton";
// import { useNavigate } from "react-router-dom";
// import constants from "../../common/constants";

export const NotFound = () => {
  // const navigate = useNavigate();
  // return (
  //   <div className="not-found">
  //     <div className="page-404">
  //       <div className="four-zero-four-bg">{/* <h1>404</h1> */}</div>
  //       <div className="content-box-404">
  //         <h3>Look like you&apos;re lost</h3>
  //         <p>the page you are looking for not available!</p>
  //       </div>
  //       <div className="back-home">
  //         <MagicButton
  //           text={"Back to Home"}
  //           onClick={() => navigate(constants.ROUTES.HOME)}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );

  return <UploadGigs />;
};
