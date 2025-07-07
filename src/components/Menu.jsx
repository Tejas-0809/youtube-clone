import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import youtubeLogo from "../assets/logo.png";
import "./Menu.css";

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`menu-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="menu-wrapper">
        <div className="menu-logo-row">
          <Link to="/" className="menu-logo-link">
            <img src={youtubeLogo} alt="YouTube Logo" className="menu-logo-img" />
            <span className="menu-logo-text">YouTube</span>
          </Link>
          <button
            onClick={handleMenuClick}
            className="menu-icon-btn"
            title="Toggle menu"
            tabIndex={0}
          >
            <MenuIcon />
          </button>
        </div>

        <nav className="menu-nav">
          <Link to="/" className="menu-item">
            <HomeIcon className="menu-item-icon" />
            Home
          </Link>
          <Link to="/trends" className="menu-item">
            <ExploreOutlinedIcon className="menu-item-icon" />
            Explore
          </Link>
          <Link to="/subscriptions" className="menu-item">
            <SubscriptionsOutlinedIcon className="menu-item-icon" />
            Subscriptions
          </Link>
        </nav>

        <hr className="menu-hr" />

        <nav className="menu-nav">
          <Link to="/library" className="menu-item">
            <VideoLibraryOutlinedIcon className="menu-item-icon" />
            Library
          </Link>
          <Link to="/history" className="menu-item">
            <HistoryOutlinedIcon className="menu-item-icon" />
            History
          </Link>
        </nav>

        <hr className="menu-hr" />

        {!currentUser && (
          <>
            <div className="menu-signin-box">
              <div className="menu-signin-text">
                Sign in to like videos, comment, and subscribe.
              </div>
              <Link to="/signin">
                <button className="menu-signin-btn">
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </button>
              </Link>
            </div>
            <hr className="menu-hr" />
          </>
        )}

        <div className="menu-section-title">BEST OF YOUTUBE</div>
        <nav className="menu-nav">
          <Link to="/music" className="menu-item">
            <LibraryMusicOutlinedIcon className="menu-item-icon" />
            Music
          </Link>
          <Link to="/sports" className="menu-item">
            <SportsBasketballOutlinedIcon className="menu-item-icon" />
            Sports
          </Link>
          <Link to="/gaming" className="menu-item">
            <SportsEsportsOutlinedIcon className="menu-item-icon" />
            Gaming
          </Link>
          <Link to="/movies" className="menu-item">
            <MovieOutlinedIcon className="menu-item-icon" />
            Movies
          </Link>
          <Link to="/news" className="menu-item">
            <ArticleOutlinedIcon className="menu-item-icon" />
            News
          </Link>
          <Link to="/live" className="menu-item">
            <LiveTvOutlinedIcon className="menu-item-icon" />
            Live
          </Link>
        </nav>

        <hr className="menu-hr" />

        <nav className="menu-nav">
          <Link to="/settings" className="menu-item">
            <SettingsOutlinedIcon className="menu-item-icon" />
            Settings
          </Link>
          <Link to="/report" className="menu-item">
            <FlagOutlinedIcon className="menu-item-icon" />
            Report
          </Link>
          <Link to="/help" className="menu-item">
            <HelpOutlineOutlinedIcon className="menu-item-icon" />
            Help
          </Link>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="menu-item menu-theme-btn"
          >
            <Brightness4Icon className="menu-item-icon" />
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Menu;