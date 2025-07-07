import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { format } from "timeago.js";
import "./Comment.css";

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});
  const [loadingChannel, setLoadingChannel] = useState(true);
  const [errorChannel, setErrorChannel] = useState(false);

  useEffect(() => {
    const fetchChannel = async () => {
      if (!comment.userId) {
        setLoadingChannel(false);
        return;
      }
      
      try {
        const res = await axiosInstance.get(`/users/find/${comment.userId}`);
        setChannel(res.data);
      } catch (err) {
        setErrorChannel(true);
        setChannel({ name: "Unknown User", img: null });
      } finally {
        setLoadingChannel(false);
      }
    };
    fetchChannel();
  }, [comment.userId]);

  if (loadingChannel) {
    return (
      <div className="comment-loading">
        <div className="comment-avatar-skeleton"></div>
        <div className="comment-content-skeleton">
          <div className="skeleton-line skeleton-short"></div>
          <div className="skeleton-line skeleton-long"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="comment-content">
      <img
        src={channel.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name || 'User')}&background=random&color=fff&size=40`}
        className="comment-user-avatar"
        alt={channel.name || "Unknown"}
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name || 'User')}&background=6366f1&color=fff&size=40`;
        }}
      />
      <div className="comment-details">
        <div className="comment-header">
          <span className="comment-username">
            {channel.name || "Unknown User"}
          </span>
          <span className="comment-time">
            {comment.createdAt ? format(comment.createdAt) : ""}
          </span>
        </div>
        <div className="comment-text">
          {comment.desc}
        </div>
      </div>
    </div>
  );
};

export default Comment;