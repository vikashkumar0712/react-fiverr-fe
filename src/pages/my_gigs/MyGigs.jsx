import "./MyGigs.scss";
import React from "react";
import { Link } from "react-router-dom";
import constants from "../../common/constants";
export const MyGigs = () => {
  return (
    <div className="my-gigs">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
          <Link to={`/add`}>
            <button>Add New Gig</button>
          </Link>
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
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="gig-image"
                className="gig-image"
              />
            </td>
            <td>Gig1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img src={constants.ENUMS.ASSETS.ICONS.DELETE} alt="delete" className="delete"/>
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
              <img src={constants.ENUMS.ASSETS.ICONS.DELETE} alt="delete" className="delete"/>
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
              <img src={constants.ENUMS.ASSETS.ICONS.DELETE} alt="delete" className="delete"/>
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
              <img src={constants.ENUMS.ASSETS.ICONS.DELETE} alt="delete" className="delete"/>
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
              <img src={constants.ENUMS.ASSETS.ICONS.DELETE} alt="delete" className="delete"/>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
