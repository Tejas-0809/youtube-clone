import Comment from '../models/Comment.js';
import Video from '../models/Video.js';
import { createError } from '../error.js';

// Add a comment
export const addComment = async (req, res, next) => {
  try {
    const newComment = new Comment({
      userId: req.user.id,
      videoId: req.params.videoId,
      desc: req.body.desc,
      parentId: req.body.parentId // For nested comments
    });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  }
};

// Get video comments
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .sort({ createdAt: -1 }); // Latest comments first
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

// Delete a comment
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(comment.videoId);

    if (!comment) return next(createError(404, 'Comment not found'));

    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      // Also delete nested comments
      await Comment.deleteMany({ parentId: req.params.id });
      res.status(200).json('Comment has been deleted');
    } else {
      return next(createError(403, 'You can delete only your comments'));
    }
  } catch (err) {
    next(err);
  }
};

// Edit a comment
export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return next(createError(404, 'Comment not found'));

    if (req.user.id === comment.userId) {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        { $set: { desc: req.body.desc } },
        { new: true }
      );
      res.status(200).json(updatedComment);
    } else {
      return next(createError(403, 'You can edit only your comments'));
    }
  } catch (err) {
    next(err);
  }
};