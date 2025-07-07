import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axiosInstance from "../utils/axiosInstance";
import "./Card.css";

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  const [loadingChannel, setLoadingChannel] = useState(true);
  const [errorChannel, setErrorChannel] = useState(false);

  useEffect(() => {
    const fetchChannel = async () => {
      if (!video.userId) {
        setLoadingChannel(false);
        setChannel({ name: "No User ID", img: null });
        return;
      }
      
      setLoadingChannel(true);
      setErrorChannel(false);
      
      try {
        const res = await axiosInstance.get(`/users/find/${video.userId}`);
        
        if (res.data) {
          setChannel(res.data);
        } else {
          setChannel({ name: "No Data Returned", img: null });
        }
        
      } catch (err) {
        setErrorChannel(true);
        setChannel({ 
          name: `Error: ${err.response?.status || 'Network Error'}`, 
          img: null 
        });
      } finally {
        setLoadingChannel(false);
      }
    };

    fetchChannel();
  }, [video.userId]);

  const channelName = channel?.name || "Loading...";
  const channelImg = channel?.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(channelName)}&background=random&color=fff&size=36`;

  return (
    <Link to={`/video/${video._id}`} className="card-link">
      <div className={type === "sm" ? "card card-sm" : "card"}>
        <img
          className={type === "sm" ? "card-img card-img-sm" : "card-img"}
          src={video.imgUrl || `https://via.placeholder.com/360x202?text=No+Image`}
          alt={video.title || "No Title"}
        />
        <div className={type !== "sm" ? "card-info card-info-mt" : "card-info"}>
          {type !== "sm" && (
            <img
              className="card-avatar"
              src={channelImg}
              alt={channelName}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(channelName)}&background=6366f1&color=fff&size=36`;
              }}
            />
          )}
          <div>
            <h1 className="card-title">
              {video.title || "Untitled Video"}
            </h1>
            <h2 className="card-channel">
              {channelName}
            </h2>
            <div className="card-meta">
              {(video.views || 0) + " views"} • {video.createdAt ? format(video.createdAt) : ""}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;