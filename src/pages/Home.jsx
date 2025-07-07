import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axiosInstance from "../utils/axiosInstance";
import "./Home.css";

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(false);
      try {
        const endpoint = type ? `/videos/${type}` : "/videos/random";
        const res = await axiosInstance.get(endpoint);

        let videosArr = [];
        if (Array.isArray(res.data)) {
          videosArr = res.data;
        } else if (res.data && Array.isArray(res.data.videos)) {
          videosArr = res.data.videos;
        } else if (res.data && Array.isArray(res.data.data)) {
          videosArr = res.data.data;
        }
        setVideos(videosArr);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [type]);

  if (loading) {
    return <div className="home-loading">Loading videos...</div>;
  }

  if (error) {
    return <div className="home-error">Error loading videos. Please try again later.</div>;
  }

  if (videos.length === 0) {
    return <div className="home-empty">No videos found for this category.</div>;
  }

  return (
    <div className="home-grid">
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </div>
  );
};

export default Home;