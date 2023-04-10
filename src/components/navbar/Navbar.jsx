import "./Navbar.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { newRequest } from "../../utils/request";
import constants from "../../common/constants";
import utility from "../../utils/utility";

export const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const refClick = useRef(null);

  const currentUser = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE.CURRENT_USER)
  );

  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    pathname === "/" && setInput("");

    if (search) {
      const queryParams = utility.urlParamsToObject(search);
      setInput(queryParams.search);
    }

    document.addEventListener("click", handleClick, true);

    window.addEventListener("scroll", isActive);
    return () => window.removeEventListener("scroll", isActive);
  }, [search, pathname]);

  const handleLogout = async () => {
    try {
      await newRequest.post("/user/logout");

      localStorage.setItem(constants.LOCAL_STORAGE.CURRENT_USER, null);
      toast.success(constants.SUCCESS_MESSAGES.USER_LOGGED_OUT);

      setTimeout(() => navigate(constants.ROUTES.HOME), 4000);
    } catch (error) {
      if (error.code === constants.RESP_ERR_CODES.ERR_NETWORK) {
        toast.error(constants.ERROR_MESSAGES.NOT_AUTHORIZED);
      } else {
        console.error(error);
        toast.error(error?.response?.data?.error || error.message);
      }
    }
  };

  const handleInput = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleSearch = () => navigate(input !== "" && `gigs?search=${input}`);

  const isSearchActive = pathname !== "/" ? true : active;

  const handleClick = (e) => {
    if (!refClick.current.contains(e.target)) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to={`/`} className="link">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        {isSearchActive && (
          <div className="search">
            <div className="search-input">
              <img
                src={constants.ENUMS.ASSETS.ICONS.SEARCH}
                alt="search-icon"
              />
              <input
                type="text"
                placeholder="What service are you looking for today?"
                value={input}
                onChange={handleInput}
              />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
        )}
        <div className="links">
          <Link
            className="link"
            to={`https://business.fiverr.com/business?source=top_nav`}
          >
            Explore
          </Link>

          <span>English</span>
          {!currentUser && (
            <Link className="link" to={`/login`}>
              Sign in
            </Link>
          )}
          {!currentUser && (
            <Link className="link" to={`/register?seller=true`}>
              Become a Seller
            </Link>
          )}
          {currentUser?.isSeller && (
            <Link className="link" to={`/my-gigs`}>
              My Gigs
            </Link>
          )}
          {currentUser?.isSeller === false && (
            <Link className="link" to={`/my-favorites`}>
              My Favorites
            </Link>
          )}
          {!currentUser && (
            <button onClick={() => navigate("/register")}>Join</button>
          )}
          {currentUser && (
            <div className="user" ref={refClick}>
              <img src={currentUser?.img} alt="profile-picture" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <Link className="link" to={`/add`}>
                      Add New Gig
                    </Link>
                  )}
                  <Link className="link" to={`/orders`}>
                    Orders
                  </Link>
                  <Link className="link" to={`/messages`}>
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link" to="/">
              Graphics & Design
            </Link>
            <Link className="link" to="/">
              Video & Animation
            </Link>
            <Link className="link" to="/">
              Writing & Translation
            </Link>
            <Link className="link" to="/">
              AI Services
            </Link>
            <Link className="link" to="/">
              Digital Marketing
            </Link>
            <Link className="link" to="/">
              Music & Audio
            </Link>
            <Link className="link" to="/">
              Programming & Tech
            </Link>
            <Link className="link" to="/">
              Business
            </Link>
            <Link className="link" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
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
