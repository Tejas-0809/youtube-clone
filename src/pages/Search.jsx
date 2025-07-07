import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import axiosInstance from "../utils/axiosInstance";
import "./Search.css";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(`/videos/search${query}`);
        setVideos(res.data);
      } catch (err) {
        setError("Failed to load videos. Please try again later.");
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [query]);

  if (loading) {
    return <div className="search-loading">Loading videos...</div>;
  }

  if (error) {
    return <div className="search-error">{error}</div>;
  }

  return (
    <div className="search-container">
      {videos.length > 0 ? (
        <div className="search-results">
          {videos.map((video) => (
            <Card key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <div className="search-empty">No videos found for your search.</div>
      )}
    </div>
  );
};

export default Search;