import "./MyGigs.scss";
import React from "react";
import { Link } from "react-router-dom";
import constants from "../../common/constants";
export const MyGigs = () => {
  const currentUser = {
    id: 1,
    username: "Zuber Khan",
    isSeller: true,
    profileImage:
      "https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg",
  };


  return (
    <div className="my-gigs">
      <div className="container">
        <div className="title">
          <h1>{currentUser.isSeller ? "Gigs" : "Orders"}</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          )}
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="gig-image"
              />
            </td>
            <td>Stunning concept art</td>
            <td>59.<sup>99</sup></td>
            <td>13</td>
            <td>
              <img className="delete" src={constants.ENUMS.ASSETS.ICONS.DELETE} alt="delete" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="gig-image"
              />
            </td>
            <td>Ai generated concept art</td>
            <td>120.<sup>99</sup></td>
            <td>41</td>
            <td>
              <img className="delete" src={constants.ENUMS.ASSETS.ICONS.DELETE} alt="delete" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="gig-image"
              />
            </td>
            <td>High quality digital character</td>
            <td>79.<sup>99</sup></td>
            <td>55</td>
            <td>
              <img className="delete" src={constants.ENUMS.ASSETS.ICONS.DELETE} alt="delete" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="gig-image"
              />
            </td>
            <td>Illustration hyper realistic painting</td>
            <td>119.<sup>99</sup></td>
            <td>29</td>
            <td>
              <img className="delete" src={constants.ENUMS.ASSETS.ICONS.DELETE} alt="delete" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="gig-image"
              />
            </td>
            <td>Original ai generated digital art</td>
            <td>59.<sup>99</sup></td>
            <td>34</td>
            <td>
              <img className="delete" src={constants.ENUMS.ASSETS.ICONS.DELETE} alt="delete"/>
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="gig-image"
              />
            </td>
            <td>Text based ai generated art</td>
            <td>110.<sup>99</sup></td>
            <td>16</td>
            <td>
              <img className="delete" src={constants.ENUMS.ASSETS.ICONS.DELETE} alt="delete" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
