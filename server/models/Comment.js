import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
    default: null, // null means it's a top-level comment
  },
}, { timestamps: true });

export default mongoose.model('Comment', CommentSchema);