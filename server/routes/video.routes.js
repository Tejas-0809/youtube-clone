import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  createVideo,
  getVideo,
  updateVideo,
  deleteVideo,
  getTrendingVideos,
  getRandomVideos,
  getSubscribedVideos,
  getVideosByTags,
  searchVideos
} from '../controllers/video.controller.js';

const router = express.Router();

// Create a video (protected)
router.post('/', verifyToken, createVideo);

// Get a video (public)
router.get('/find/:id', getVideo);

// Update a video (protected)
router.put('/:id', verifyToken, updateVideo);

// Delete a video (protected)
router.delete('/:id', verifyToken, deleteVideo);

// Get trending videos
router.get('/trending', getTrendingVideos);

// Get random videos
router.get('/random', getRandomVideos);

// Get subscribed videos (protected)
router.get('/subscribed', verifyToken, getSubscribedVideos);

// Get videos by tags
router.get('/tags', getVideosByTags);

// Search videos
router.get('/search', searchVideos);

export default router;