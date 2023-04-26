import "./Navbar.scss";
import { toast } from "react-toastify";
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { newRequest } from "../../utils/request";
import { Menu } from "../menu/Menu";
import { Dialog } from "../dialog/Dialog";
import constants from "../../common/constants";
import utility from "../../utils/utility";

export const Navbar = () => {
  const currentUser = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE.CURRENT_USER)
  );

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const refClick = useRef(null);

  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const isAllowed =
    pathname !== constants.ROUTES.LOGIN &&
    pathname !== constants.ROUTES.REGISTER &&
    pathname !== constants.ROUTES.SETUP_ACCOUNT &&
    utility.getPathname(pathname) !== constants.ROUTES.ACCOUNT_VERIFY;

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  const handleInput = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleSearch = () =>
    navigate(input !== "" && `${constants.ROUTES.GIGS}?search=${input}`);

  const isSearchActive = pathname !== constants.ROUTES.HOME ? true : active;

  const handleClick = (e) =>
    refClick && refClick.current.contains(e.target)
      ? setOpen(true)
      : setOpen(false);

  useEffect(() => {
    pathname === constants.ROUTES.HOME && setInput("");

    if (search) {
      const queryParams = utility.urlParamsToObject(search);
      setInput(queryParams.search);
    }

    document.addEventListener("click", handleClick);

    window.addEventListener("scroll", isActive);
    return () => window.removeEventListener("scroll", isActive);
  }, [search, pathname]);

  const handleLogout = async () => {
    try {
      await newRequest.post("/user/logout");

      localStorage.setItem(constants.LOCAL_STORAGE.CURRENT_USER, null);

      toast.success(constants.SUCCESS_MESSAGES.USER_LOGGED_OUT);
      navigate(constants.ROUTES.HOME);
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
    isAllowed && (
      <div
        className={
          active || pathname !== constants.ROUTES.HOME
            ? "navbar active"
            : "navbar"
        }
      >
        <div className="container">
          <div className="logo">
            <Link to={constants.ROUTES.HOME} className="link">
              <span className="text">fiverr</span>
            </Link>
            <span className="dot">.</span>
          </div>
          {isSearchActive && (
            <div className="search">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="What service are you looking for today?"
                  value={input}
                  onChange={handleInput}
                />
              </div>
              <button onClick={handleSearch}>
                <img
                  src={constants.ENUMS.ASSETS.ICONS.SEARCH}
                  alt="search-icon"
                />
              </button>
            </div>
          )}
          <div className="links">
            <Link className="link" to={constants.ROUTES.EXPLORE}>
              Explore
            </Link>

            <span>English</span>
            {!currentUser && (
              <Link className="link" to={constants.ROUTES.LOGIN}>
                Sign in
              </Link>
            )}
            {!currentUser && (
              <Link
                className="link"
                to={`${constants.ROUTES.REGISTER}?seller=true`}
              >
                Become a Seller
              </Link>
            )}
            {currentUser?.isSeller && (
              <Link className="link" to={constants.ROUTES.MY_GIGS}>
                My Gigs
              </Link>
            )}
            {currentUser?.isSeller === false && (
              <Link className="link" to={constants.ROUTES.MY_FAVORITES}>
                My Favorites
              </Link>
            )}
            {!currentUser && (
              <button onClick={() => navigate(constants.ROUTES.REGISTER)}>
                Join
              </button>
            )}
            {currentUser && (
              <div className="user" ref={refClick}>
                <img src={currentUser?.img} alt="profile-picture" />
                {currentUser?.isSeller && (
                  <div className="verified">
                    <img
                      className="icon"
                      src={constants.ENUMS.ASSETS.ICONS.VERIFIED}
                      alt="orders"
                      style={{ width: "15px", height: "15px", margin: "-1.4%" }}
                    />
                  </div>
                )}
                {open && (
                  <Dialog user={currentUser} onClickLogout={handleLogout} />
                )}
              </div>
            )}
          </div>
        </div>
        {(active || pathname !== constants.ROUTES.HOME) && <Menu />}
      </div>
    )
  );
};
