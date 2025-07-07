import React, { useEffect, useState } from "react";
import Card from "./Card";
import axiosInstance from "../utils/axiosInstance";

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(false);
      try {
        const tagsParam = Array.isArray(tags) ? tags.join(",") : tags;
        const res = await axiosInstance.get(`/videos/tags?tags=${tagsParam}`);
        setVideos(res.data);
      } catch (err) {
        setError(true);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [tags]);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "40px" }}>Loading recommendations...</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center", marginTop: "40px", color: "red" }}>Error loading recommendations.</div>;
  }

  if (videos.length === 0) {
    return <div style={{ textAlign: "center", marginTop: "40px", color: "gray" }}>No recommendations found.</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </div>
  );
};

export default Recommendation;