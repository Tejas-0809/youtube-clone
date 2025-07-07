import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure } from "../redux/userSlice";
import { FaSearch } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import youtubeLogo from "../assets/logo.png";
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [q, setQ] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(loginFailure());
    localStorage.removeItem("persist:root");
    navigate("/signin");
  };

  return (
    <>
      <header className="header-root">
        {/* Mobile Menu Button */}
        <button
          className="header-mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon />
        </button>

        {/* Logo */}
        <div className="header-logo-box">
          <Link to="/" className="header-logo-link">
            <img
              src={youtubeLogo}
              alt="YouTube Logo"
              className="header-logo-img"
            />
            <span className="header-logo-text">
              <span className="header-logo-text-main">YouTube</span>
              <span className="header-logo-text-sub">IN</span>
            </span>
          </Link>
        </div>
        
        {/* Search */}
        <div className="header-search-box">
          <div className="header-search-inner">
            <input
              type="text"
              className="header-search-input"
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/search?q=${q}`)}
            />
            <button
              className="header-search-btn"
              onClick={() => navigate(`/search?q=${q}`)}
            >
              <FaSearch className="header-search-icon" />
            </button>
          </div>
        </div>
        
        {/* Right: User */}
        <div className="header-right">
          {currentUser ? (
            <div className="header-user-box">
              <div
                className="header-user-info"
                onClick={() => navigate("/profile")}
              >
                <img
                  src={(currentUser?.user?.img || currentUser?.img) || `https://ui-avatars.com/api/?name=${encodeURIComponent((currentUser?.user?.name || currentUser?.name) || 'User')}&background=random&color=fff&size=32`}
                  alt="avatar"
                  className="header-user-avatar"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((currentUser?.user?.name || currentUser?.name) || 'User')}&background=6366f1&color=fff&size=32`;
                  }}
                />
                <span className="header-user-name">
                  {currentUser?.user?.name || currentUser?.name}
                </span>
              </div>
              <button
                className="header-signout-btn"
                title="Sign Out"
                onClick={handleSignOut}
              >
                <FiLogOut className="header-signout-icon" />
              </button>
            </div>
          ) : (
            <Link to="/signin" className="header-signin-link">
              <button className="header-signin-btn">
                <svg
                  className="header-signin-svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                SIGN IN
              </button>
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;