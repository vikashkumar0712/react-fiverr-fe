import "./NotFound.scss";
import React, { useEffect, useState } from "react";
// import { MagicButton } from "../../components/magic_button/MagicButton";
// import { useNavigate } from "react-router-dom";
// import constants from "../../common/constants";

import { FileUploadWithPreview } from "file-upload-with-preview";
import "file-upload-with-preview/dist/style.css";

export const NotFound = () => {
  const [eventFile, setEventFile] = useState("");
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

  useEffect(() => {
    const importedBaseImage =
      "https://www.svgrepo.com/show/451131/no-image.svg";

    const upload = new FileUploadWithPreview("myUniqueUploadId", {
      showDeleteButtonOnImages: true,
      images: {
        baseImage: importedBaseImage,
      },
      maxFileCount: 5,
      multiple: true,
      presetFiles: [
        "https://images.unsplash.com/photo-1557090495-fc9312e77b28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
        importedBaseImage,
        "https://images.unsplash.com/photo-1632333650998-8842b63f5cfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80",
      ],
      text: {
        browse: "Choose",
        chooseFile: "Take your pick...",
        label: "Choose Files to Upload",
      },
    });
    setEventFile(upload.cachedFileArray);
  }, []);

  console.log(eventFile);

  return (
    <div
      className="custom-file-container"
      data-upload-id="myUniqueUploadId"
    ></div>
  );
};
