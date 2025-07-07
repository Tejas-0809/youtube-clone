import React, { useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import "./App.css";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Video = lazy(() => import("./pages/Video"));
const Search = lazy(() => import("./pages/Search"));
const Signin = lazy(() => import("./pages/Signin"));
const UserProfile = lazy(() => import("./components/UserProfile"));

function App() {
  const [darkMode, setDarkMode] = useState(false); // false = light mode by default

  return (
    <div className={darkMode ? "theme-dark" : "theme-light"}>
      <div className="app-layout">
        <Header />
        <div className="app-content">
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="app-main">
            <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trends" element={<Home type="trending" />} />
                <Route path="/subscriptions" element={<Home type="subscribed" />} />
                <Route path="/video/:id" element={<Video />} />
                <Route path="/search" element={<Search />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/music" element={<Home type="music" />} />
                <Route path="/sports" element={<Home type="sports" />} />
                <Route path="/gaming" element={<Home type="gaming" />} />
                <Route path="/movies" element={<Home type="movies" />} />
                <Route path="/news" element={<Home type="news" />} />
                <Route path="/live" element={<Home type="live" />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
