import User from '../models/User.js';
import Video from '../models/Video.js';
import { createError } from '../error.js';

// Subscribe to a channel
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { subscribedUsers: req.params.channelId } // Use addToSet to avoid duplicates
    });
    await User.findByIdAndUpdate(req.params.channelId, {
      $inc: { subscribers: 1 }
    });
    
    res.status(200).json('Subscription successful');
  } catch (err) {
    next(err);
  }
};

// Unsubscribe from a channel
export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.channelId }
    });
    await User.findByIdAndUpdate(req.params.channelId, {
      $inc: { subscribers: -1 }
    });
    
    res.status(200).json('Unsubscription successful');
  } catch (err) {
    next(err);
  }
};

// Like a video
export const likeVideo = async (req, res, next) => {
  const userId = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId }
    });
    res.status(200).json('Video has been liked');
  } catch (err) {
    next(err);
  }
};

// Dislike a video
export const dislikeVideo = async (req, res, next) => {
  const userId = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId }
    });
    res.status(200).json('Video has been disliked');
  } catch (err) {
    next(err);
  }
};