import "./Orders.scss";
import React from "react";
import constants from "../../common/constants";
export const Orders = () => {
  const currentUser = {
    id: 1,
    username: "Zuber Khan",
    isSeller: true,
    profileImage:
      "https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg",
  };

  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>
              {currentUser?.isSeller
                ? constants.ENUMS.ROLE.BUYER
                : constants.ENUMS.ROLE.SELLER}
            </th>
            <th>Contact</th>
          </tr>
          <tr>
            <td>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="gig-image"
                className="gig-image"
              />
            </td>
            <td>Gig1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img
                src={constants.ENUMS.ASSETS.ICONS.MESSAGE}
                alt="message"
                className="message"
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="gig-image"
                className="gig-image"
              />
            </td>
            <td>Gig1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img
                src={constants.ENUMS.ASSETS.ICONS.MESSAGE}
                alt="message"
                className="message"
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="gig-image"
                className="gig-image"
              />
            </td>
            <td>Gig1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img
                src={constants.ENUMS.ASSETS.ICONS.MESSAGE}
                alt="message"
                className="message"
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="gig-image"
                className="gig-image"
              />
            </td>
            <td>Gig1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img
                src={constants.ENUMS.ASSETS.ICONS.MESSAGE}
                alt="message"
                className="message"
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="gig-image"
                className="gig-image"
              />
            </td>
            <td>Gig1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img
                src={constants.ENUMS.ASSETS.ICONS.MESSAGE}
                alt="message"
                className="message"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
