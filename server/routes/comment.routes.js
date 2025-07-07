import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  addComment,
  getComments,
  deleteComment,
  editComment
} from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/:videoId', verifyToken, addComment);
router.get('/:videoId', getComments);
router.put('/:id', verifyToken, editComment); // Add this line
router.delete('/:id', verifyToken, deleteComment);

export default router;