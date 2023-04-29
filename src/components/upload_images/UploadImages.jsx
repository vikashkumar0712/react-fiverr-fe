import "./UploadImages.scss";
import "file-upload-with-preview/dist/style.css";
import importedBaseImage from "./assets/selectImage.svg";
import importedBaseImages from "./assets/selectImages.svg";
import React, { useEffect } from "react";
import { Events, FileUploadWithPreview } from "file-upload-with-preview";

export const UploadImages = ({
  single = true,
  multiple = false,
  multipleMaxFileCount = 3,
  labelSingle = "Select Single Image to Upload",
  labelMultiple = "Select Multiple Images to Upload",
  setSingleImage,
  setMultipleImages,
}) => {
  useEffect(() => {
    // SINGLE IMAGE HANDLER
    single &&
      new FileUploadWithPreview("single", {
        images: {
          baseImage: importedBaseImage,
        },
        text: {
          chooseFile: "Browse an image",
          label: labelSingle,
        },
      });

    // MULTIPLE IMAGES HANDLER
    multiple &&
      new FileUploadWithPreview("multiple", {
        showDeleteButtonOnImages: true,
        images: {
          baseImage: importedBaseImages,
        },
        maxFileCount: multipleMaxFileCount,
        multiple: true,
        text: {
          browse: "Choose",
          chooseFile: "Choose images",
          label: labelMultiple,
        },
      });
  }, []);

  window.addEventListener(Events.IMAGE_ADDED, (e) => {
    const { detail } = e;

    detail.uploadId === "single"
      ? setSingleImage(detail.cachedFileArray[0])
      : setMultipleImages(detail.cachedFileArray);
  });

  window.addEventListener(Events.IMAGE_DELETED, (e) => {
    const { detail } = e;

    detail.uploadId === "single"
      ? setSingleImage(detail.cachedFileArray[0])
      : setMultipleImages(detail.cachedFileArray);
  });

  window.addEventListener(Events.CLEAR_BUTTON_CLICKED, (e) => {
    const { detail } = e;
    detail.uploadId === "single" ? setSingleImage(null) : setMultipleImages([]);
  });

  return (
    <div className="demo-upload-container">
      {single && (
        <div className="custom-file-container" data-upload-id="single"></div>
      )}
      {multiple && (
        <div className="custom-file-container" data-upload-id="multiple"></div>
      )}
    </div>
  );
};
