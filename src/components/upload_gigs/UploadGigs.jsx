import "./UploadGigs.scss";
import "file-upload-with-preview/dist/style.css";
import React, { useEffect } from "react";
import { Events, FileUploadWithPreview } from "file-upload-with-preview";

export const UploadGigs = () => {
  const importedBaseImage = "https://www.svgrepo.com/show/451131/no-image.svg";

  useEffect(() => {
    new FileUploadWithPreview("cover");

    new FileUploadWithPreview("images", {
      showDeleteButtonOnImages: true,
      images: {
        baseImage: importedBaseImage,
      },
      maxFileCount: 5,
      multiple: true,
      presetFiles: [importedBaseImage],
      text: {
        browse: "Choose",
        chooseFile: "Take your pick...",
        label: "Choose Files to Upload",
      },
    });
  }, []);

  window.addEventListener(Events.IMAGE_ADDED, (e) => {
    const { detail } = e;

    console.log(`detail ${Events.IMAGE_ADDED}`, detail.files);
  });

  window.addEventListener(Events.IMAGE_DELETED, (e) => {
    const { detail } = e;

    console.log(`detail ${Events.IMAGE_DELETED}`, detail);
  });

  window.addEventListener(Events.CLEAR_BUTTON_CLICKED, (e) => {
    const { detail } = e;

    console.log(`detail ${Events.CLEAR_BUTTON_CLICKED}`, detail);
  });

  window.addEventListener(Events.IMAGE_MULTI_ITEM_CLICKED, (e) => {
    const { detail } = e;

    console.log(`detail ${Events.IMAGE_MULTI_ITEM_CLICKED}`, detail);
  });
  return (
    <div className="demo-upload-container">
      <div className="custom-file-container" data-upload-id="cover"></div>
      <div className="custom-file-container" data-upload-id="images"></div>
    </div>
  );
};
