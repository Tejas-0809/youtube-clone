import Video from '../models/Video.js';

export const incrementViews = async (req, res, next) => {
  try {
    const videoId = req.params.videoId;
    
    // Use findOneAndUpdate to atomically increment the views
    await Video.findByIdAndUpdate(videoId, {
      $inc: { views: 1 }
    });
    
    next();
  } catch (err) {
    next(err);
  }
};