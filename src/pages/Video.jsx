import React, { useEffect, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription, loginFailure } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import axiosInstance from "../utils/axiosInstance";
import "./Video.css";

const Video = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentVideo } = useSelector((state) => state.video);
  const { currentUser } = useSelector((state) => state.user);
  const [channel, setChannel] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [liking, setLiking] = useState(false);
  const [disliking, setDisliking] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const videoRes = await axiosInstance.get(`/videos/find/${id}`, {
          signal: controller.signal
        });
        
        dispatch(fetchSuccess(videoRes.data));
        
        try {
          const channelRes = await axiosInstance.get(
            `/users/find/${videoRes.data.userId}`,
            { signal: controller.signal }
          );
          
          const channelData = channelRes.data;
          setChannel(channelData);
        } catch (channelErr) {
          setChannel({ name: "Unknown Channel", img: null, subscribers: 0 });
        }
        
        clearTimeout(timeoutId);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, dispatch]);

  const handleLike = async () => {
    if (liking) return;
    setLiking(true);
    try {
      await axiosInstance.put(`/users/like/${currentVideo._id}`);
      dispatch(like(currentUser?._id));
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        dispatch(loginFailure());
        navigate("/signin");
      }
    } finally {
      setLiking(false);
    }
  };

  const handleDislike = async () => {
    if (disliking) return;
    setDisliking(true);
    try {
      await axiosInstance.put(`/users/dislike/${currentVideo._id}`);
      dispatch(dislike(currentUser?._id));
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        dispatch(loginFailure());
        navigate("/signin");
      }
    } finally {
      setDisliking(false);
    }
  };

  const handleSub = async () => {
    if (subscribing || !currentUser) return;
    setSubscribing(true);
    try {
      const userId = currentUser?.user?._id || currentUser?._id;
      const userData = currentUser?.user || currentUser;
      const isSubscribed = userData?.subscribedUsers?.includes(channel._id);
      
      if (isSubscribed) {
        await axiosInstance.put(`/users/unsub/${channel._id}`);
      } else {
        await axiosInstance.put(`/users/sub/${channel._id}`);
      }
      dispatch(subscription(channel._id));
    } catch (err) {
      // Silent error handling for production
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) return <div className="video-loading">Loading...</div>;
  if (error) return <div className="video-error">Error loading video or video not found.</div>;
  if (!currentVideo) return <div className="video-notfound">Video not found.</div>;

  return (
    <div className="video-page">
      <div className="video-main">
        <div>
          {currentVideo.videoUrl && currentVideo.videoUrl.trim() !== "" ? (
            <video
              src={currentVideo.videoUrl}
              controls
              className="video-player"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="video-error">Video source not available or invalid.</div>
          )}
        </div>
        <h1 className="video-title">{currentVideo.title}</h1>
        <div className="video-meta-row">
          <span className="video-meta">
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </span>
          <div className="video-actions">
            <button className="video-action-btn" onClick={handleLike} disabled={liking}>
              {currentVideo.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
              {currentVideo.likes?.length || 0}
            </button>
            <button className="video-action-btn" onClick={handleDislike} disabled={disliking}>
              {currentVideo.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}
              Dislike
            </button>
            <button className="video-action-btn">
              <ReplyOutlinedIcon /> Share
            </button>
            <button className="video-action-btn">
              <AddTaskOutlinedIcon /> Save
            </button>
          </div>
        </div>
        <hr className="video-hr" />
        <div className="video-channel-row">
          <div className="video-channel-info">
            <img
              src={channel.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name || 'U')}&background=random&color=fff&size=48`}
              className="video-channel-avatar"
              alt={channel.name || "Unknown"}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name || 'U')}&background=6366f1&color=fff&size=48`;
              }}
            />
            <div className="video-channel-details">
              <span className="video-channel-name">{channel.name || "Unknown Channel"}</span>
              <span className="video-channel-subs">
                {channel.subscribers || 0} subscribers
              </span>
              <p className="video-channel-desc">{currentVideo.desc}</p>
            </div>
          </div>
          <button
            className="video-sub-btn"
            onClick={handleSub}
            disabled={subscribing || !currentUser}
          >
            {subscribing ? "Loading..." : 
             (currentUser?.user?.subscribedUsers || currentUser?.subscribedUsers)?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
          </button>
        </div>
        <hr className="video-hr" />
        <Comments videoId={currentVideo._id} />
      </div>
      <Recommendation tags={currentVideo.tags} />
    </div>
  );
};

export default Video;