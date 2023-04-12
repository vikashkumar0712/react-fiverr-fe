import "./Add.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useReducer, useState } from "react";
import { INITIAL_STATE, addReducer } from "./addReducer";
import { upload } from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../utils/request";
import { useNavigate } from "react-router-dom";
import constants from "../../common/constants";

export const Add = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [multipleImages, setMultipleImages] = useState([]);
  const [feature, setFeature] = useState("");
  const [state, dispatch] = useReducer(addReducer, INITIAL_STATE);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleCover = (e) => {
    const { files } = e.target;
    const file = files[0];
    setCoverImage(file);
  };

  const handleImages = (e) => {
    const { files } = e.target;
    setMultipleImages(files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: constants.REDUCER.ADD_GIG.ACTION_TYPES.CHANGE_INPUT,
      payload: { name: name, value: value },
    });
  };

  const handleFeature = (e) => {
    const { value } = e.target;
    setFeature(value);
  };

  const handleAddFeature = (e) => {
    e.stopPropagation();
    if (state.features.length <= 4) {
      if (feature !== "") {
        dispatch({
          type: constants.REDUCER.ADD_GIG.ACTION_TYPES.ADD_FEATURE,
          payload: feature,
        });

        setFeature("");
      } else {
        toast.error(constants.ERROR_MESSAGES.FEATURE_NOT_VALID);
      }
    } else {
      toast.error("LIMIT REACHED");
    }
  };

  const handleRemoveFeature = (removeFeature) => {
    dispatch({
      type: constants.REDUCER.ADD_GIG.ACTION_TYPES.REMOVE_FEATURE,
      payload: removeFeature,
    });
  };

  const handleUpload = async (e) => {
    e.stopPropagation();
    try {
      const cover = await toast.promise(
        upload(coverImage),
        constants.PARAMS.COVER_UPLOADING
      );

      const images =
        [...multipleImages].length !== 0
          ? await toast.promise(
              Promise.all(
                [...multipleImages].map(async (image) => await upload(image))
              ),
              constants.PARAMS.IMAGES_UPLOADING
            )
          : [];

      dispatch({
        type: constants.REDUCER.ADD_GIG.ACTION_TYPES.ADD_IMAGES,
        payload: { cover: cover, images: images },
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error || error.message);
    }
  };

  const mutation = useMutation({
    mutationFn: async (gigParams) => {
      await newRequest.post("/gig", gigParams);
    },
    onSuccess: () => queryClient.invalidateQueries(["myGigs"]),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await mutation.mutateAsync(state);
      toast.success(constants.SUCCESS_MESSAGES.GIG_ADD);
      setTimeout(() => navigate(constants.ROUTES.MY_GIGS), 4000);
    } catch (error) {
      if (error.code === constants.RESP_ERR_CODES.ERR_NETWORK) {
        toast.error(constants.ERROR_MESSAGES.NOT_AUTHORIZED);
      } else {
        console.error(error);
        toast.error(error?.response?.data?.error || error.message);
      }
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig </h1>
        <form className="sections" onSubmit={handleSubmit}>
          <div className="info">
            <label htmlFor="">
              Title <span>*</span>
            </label>
            <input
              name="title"
              type="text"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
              required
            />

            <label htmlFor="">
              Category <span>*</span>
            </label>
            <select name="cat" onChange={handleChange}>
              <option value="ai-artists">AI Artists</option>
              <option value="ai-services">AI Services</option>
              <option value="business">Business</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="graphics-design">Graphics & Design</option>
              <option value="illustration">Illustration</option>
              <option value="logo-design">Logo Design</option>
              <option value="music-audio">Music & Audio</option>
              <option value="photography">Photography</option>
              <option value="programming-tech">Programming & Tech</option>
              <option value="seo">SEO</option>
              <option value="social-media">Social Media</option>
              <option value="video-animation">Video & Animation</option>
              <option value="video-explainer">Video Explainer</option>
              <option value="voice-over">Voice Over</option>
              <option value="web-development">Web Development</option>
              <option value="wordpress">WordPress</option>
              <option value="writing-translation">Writing & Translation</option>
            </select>

            <label htmlFor="">
              Cover Image <span>*</span>
            </label>
            <input
              type="file"
              name="images/*"
              onChange={handleCover}
              required
            />
            <label htmlFor="">Upload Images</label>
            <input
              type="file"
              name="images/*"
              multiple
              onChange={handleImages}
            />

            <button type="button" onClick={handleUpload}>
              Upload
            </button>

            <label htmlFor="">
              Description <span>*</span>
            </label>
            <textarea
              name="desc"
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">ADD</button>
          </div>

          <div className="details">
            <label htmlFor="">
              Short Title <span>*</span>
            </label>
            <input
              name="shortTitle"
              type="text"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
              required
            />

            <label htmlFor="">
              Short Description <span>*</span>
            </label>
            <textarea
              name="shortDesc"
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              onChange={handleChange}
              required
            ></textarea>

            <label htmlFor="">
              Delivery Time <span>*</span> (e.g. 3 days)
            </label>
            <input
              name="deliveryTime"
              type="number"
              min={1}
              defaultValue={3}
              onChange={handleChange}
              required
            />

            <label htmlFor="">
              Revision Number <span>*</span>
            </label>
            <input
              name="revisionNumber"
              type="number"
              min={1}
              defaultValue={1}
              onChange={handleChange}
              required
            />

            <label htmlFor="">
              Add Features <span>*</span> (min 1 - max 5)
            </label>
            <div className="add-features">
              <input
                type="text"
                placeholder="e.g. page design"
                required={state?.features?.length === 0 ? true : false}
                value={feature}
                onChange={handleFeature}
              />
              <button type="button" onClick={handleAddFeature}>
                &nbsp;&nbsp;+&nbsp;&nbsp;
              </button>
            </div>
            {state?.features?.length === 0 ? (
              <label htmlFor="">No added Features yet!</label>
            ) : (
              <div className="added-features">
                {state?.features?.map((feature, index) => {
                  return (
                    <button type="button" key={index}>
                      {feature}
                      <span onClick={() => handleRemoveFeature(feature)}>
                        X
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            <label htmlFor="">
              Price <span>*</span>
            </label>
            <input
              name="price"
              type="number"
              min={1}
              defaultValue={1000}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
