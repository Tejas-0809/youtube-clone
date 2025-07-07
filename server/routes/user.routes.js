import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  subscribe,
  unsubscribe,
  likeVideo,
  dislikeVideo
} from '../controllers/user.controller.js';

const router = express.Router();

// Subscribe/Unsubscribe routes
router.put('/sub/:channelId', verifyToken, subscribe);
router.put('/unsub/:channelId', verifyToken, unsubscribe);

// Like/Dislike routes
router.put('/like/:videoId', verifyToken, likeVideo);
router.put('/dislike/:videoId', verifyToken, dislikeVideo);

export default router;