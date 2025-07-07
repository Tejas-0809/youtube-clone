import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import "./UserProfile.css";

const UserProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [loadingSubscribed, setLoadingSubscribed] = useState(true);
  const [errorSubscribed, setErrorSubscribed] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const fetchSubscribedChannels = async () => {
      setLoadingSubscribed(true);
      setErrorSubscribed(false);
      try {
        const userData = currentUser.user || currentUser;
        if (userData.subscribedUsers && userData.subscribedUsers.length > 0) {
          const userPromises = userData.subscribedUsers.map(async (userId) => {
            try {
              const res = await axiosInstance.get(`/users/find/${userId}`);
              return res.data;
            } catch (err) {
              console.error(`Failed to fetch user ${userId}:`, err);
              return { _id: userId, name: `User ${userId.slice(-4)}`, email: "Unknown" };
            }
          });
          
          const users = await Promise.all(userPromises);
          setSubscribedChannels(users);
        } else {
          setSubscribedChannels([]);
        }
      } catch (err) {
        console.error("Error fetching subscribed channels:", err);
        setErrorSubscribed(true);
        setSubscribedChannels([]);
      } finally {
        setLoadingSubscribed(false);
      }
    };

    fetchSubscribedChannels();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="userprofile-container userprofile-center">
        <h2>Please sign in to view your profile</h2>
        <p>You need to be logged in to access your channel information.</p>
      </div>
    );
  }
  
  const userData = currentUser.user || currentUser;
  const userName = userData.name || userData.displayName || userData.email?.split('@')[0] || 'Unknown User';

  return (
    <div className="userprofile-container">
      <h1 className="userprofile-title">{userName}'s Channel</h1>
      
      <div className="userprofile-section">
        <h2 className="userprofile-section-title">Channel Information</h2>
        <div className="userprofile-info">
          <p><strong>Name:</strong> {userName}</p>
          <p><strong>Email:</strong> {userData.email || 'Not available'}</p>
          <p><strong>Subscribers:</strong> {userData.subscribers || 0}</p>
          <p><strong>Subscriptions:</strong> {userData.subscribedUsers?.length || 0}</p>
          <p><strong>Member since:</strong> {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Unknown'}</p>
        </div>
      </div>
      
      <div className="userprofile-section">
        <h2 className="userprofile-section-title">Subscribed Channels</h2>
        {loadingSubscribed ? (
          <p className="userprofile-loading">Loading subscribed channels...</p>
        ) : errorSubscribed ? (
          <p className="userprofile-error">Error loading subscribed channels.</p>
        ) : subscribedChannels.length === 0 ? (
          <p className="userprofile-none">No subscriptions yet</p>
        ) : (
          <ul className="userprofile-list">
            {subscribedChannels.map((ch) => (
              <li key={ch._id}>
                <div className="subscription-item">
                  <img 
                    src={ch.img || `https://via.placeholder.com/32?text=${ch.name?.charAt(0) || 'U'}`} 
                    alt={ch.name || 'Unknown'} 
                    className="subscription-avatar"
                  />
                  <div>
                    <strong>{ch.name || 'Unknown User'}</strong>
                    <br />
                    <small>{ch.email || 'No email'}</small>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserProfile;