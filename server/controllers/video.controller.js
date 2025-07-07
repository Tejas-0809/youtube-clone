import Video from '../models/Video.js';
import User from '../models/User.js';
import { createError } from '../error.js';

// Create a video
export const createVideo = async (req, res, next) => {
  try {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

// Get a video
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!video) return next(createError(404, 'Video not found'));
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

// Update a video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video not found'));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, 'You can update only your video'));
    }
  } catch (err) {
    next(err);
  }
};

// Delete a video
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video not found'));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json('Video has been deleted');
    } else {
      return next(createError(403, 'You can delete only your video'));
    }
  } catch (err) {
    next(err);
  }
};

// Get trending videos
export const getTrendingVideos = async (req, res, next) => {
  try {
    // Get videos sorted by views in descending order
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// Get random videos
export const getRandomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// Get subscribed channel videos
export const getSubscribedVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const videos = await Video.find({
      userId: { $in: subscribedChannels }
    }).sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// Search videos by tags
export const getVideosByTags = async (req, res, next) => {
  const tags = req.query.tags.split(',');
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// Search videos by title
export const searchVideos = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: 'i' }
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};