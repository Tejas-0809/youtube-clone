import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axiosInstance from "../utils/axiosInstance";
import "./Comments.css";

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showMenuId, setShowMenuId] = useState(null);
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorComments, setErrorComments] = useState(false);
  const [postingComment, setPostingComment] = useState(false);
  const [editingComment, setEditingComment] = useState(false);
  const [deletingComment, setDeletingComment] = useState(false);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      setLoadingComments(true);
      setErrorComments(false);
      try {
        const res = await axiosInstance.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {
        setErrorComments(true);
      } finally {
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, [videoId]);

  const handlePost = async () => {
    if (!newComment.trim() || postingComment) return;
    setPostingComment(true);
    try {
      await axiosInstance.post(`/comments/${videoId}`, { desc: newComment });
      setNewComment("");
      // Re-fetch comments
      const res = await axiosInstance.get(`/comments/${videoId}`);
      setComments(res.data);
    } catch (err) {
      // Silent error handling for production
    } finally {
      setPostingComment(false);
    }
  };

  const handleEditStart = (comment) => {
    setEditingId(comment._id);
    setEditValue(comment.desc);
    setShowMenuId(null);
  };

  const handleEditSave = async () => {
    if (!editValue.trim() || editingComment) return;
    setEditingComment(true);
    try {
      await axiosInstance.put(`/comments/${editingId}`, { desc: editValue });
      setEditingId(null);
      setEditValue("");
      // Re-fetch comments
      const res = await axiosInstance.get(`/comments/${videoId}`);
      setComments(res.data);
    } catch (err) {
      // Silent error handling for production
    } finally {
      setEditingComment(false);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleDelete = async (id) => {
    if (deletingComment) return;
    setDeletingComment(true);
    try {
      await axiosInstance.delete(`/comments/${id}`);
      setShowMenuId(null);
      // Re-fetch comments
      const res = await axiosInstance.get(`/comments/${videoId}`);
      setComments(res.data);
    } catch (err) {
      // Silent error handling for production
    } finally {
      setDeletingComment(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEditSave();
    }
    if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  if (loadingComments) {
    return <div className="comments-loading">Loading comments...</div>;
  }

  if (errorComments) {
    return <div className="comments-error">Error loading comments.</div>;
  }

  return (
    <div className="comments-container">
      <h3 className="comments-title">Comments ({comments.length})</h3>

      {/* Add comment form */}
      <div className="comment-form">
        <img
          src={(currentUser?.user?.img || currentUser?.img) || `https://ui-avatars.com/api/?name=${encodeURIComponent((currentUser?.user?.name || currentUser?.name) || 'User')}&background=random&color=fff&size=40`}
          className="comment-avatar"
          alt="Your avatar"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((currentUser?.user?.name || currentUser?.name) || 'User')}&background=6366f1&color=fff&size=40`;
          }}
        />
        <div className="comment-input-wrapper">
          <textarea
            className="comment-input"
            placeholder={currentUser ? "Add a comment..." : "Sign in to comment"}
            disabled={!currentUser || postingComment}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            rows="2"
          />
          <div className="comment-actions">
            <button
              onClick={() => setNewComment("")}
              className="comment-btn comment-btn-cancel"
              disabled={!newComment.trim()}
            >
              Cancel
            </button>
            <button
              onClick={handlePost}
              className="comment-btn comment-btn-post"
              disabled={!currentUser || postingComment || !newComment.trim()}
            >
              {postingComment ? "Posting..." : "Comment"}
            </button>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="comments-empty">No comments yet. Be the first to comment!</div>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="comment-item">
              {editingId === comment._id ? (
                // Edit mode
                <div className="comment-edit">
                  <img
                    src={(currentUser?.user?.img || currentUser?.img) || `https://ui-avatars.com/api/?name=${encodeURIComponent((currentUser?.user?.name || currentUser?.name) || 'User')}&background=random&color=fff&size=40`}
                    className="comment-avatar"
                    alt="Your avatar"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent((currentUser?.user?.name || currentUser?.name) || 'User')}&background=6366f1&color=fff&size=40`;
                    }}
                  />
                  <div className="comment-input-wrapper">
                    <textarea
                      className="comment-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={handleEditKeyDown}
                      rows="2"
                      autoFocus
                    />
                    <div className="comment-actions">
                      <button
                        onClick={handleEditCancel}
                        className="comment-btn comment-btn-cancel"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleEditSave}
                        className="comment-btn comment-btn-save"
                        disabled={editingComment || !editValue.trim()}
                      >
                        {editingComment ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // View mode
                <div className="comment-view">
                  <Comment comment={comment} />
                  {/* Fix the user ID comparison */}
                  {((currentUser?.user?._id || currentUser?._id) === comment.userId) && (
                    <div className="comment-menu">
                      <MoreVertIcon
                        className="comment-menu-icon"
                        onClick={() =>
                          setShowMenuId(showMenuId === comment._id ? null : comment._id)
                        }
                      />
                      {showMenuId === comment._id && (
                        <div className="comment-dropdown">
                          <button
                            className="dropdown-item"
                            onClick={() => handleEditStart(comment)}
                          >
                            Edit
                          </button>
                          <button
                            className="dropdown-item dropdown-item-delete"
                            onClick={() => handleDelete(comment._id)}
                            disabled={deletingComment}
                          >
                            {deletingComment ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;