'use client';

import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

interface CommentModalProps {
  post: any;
  onClose: () => void;
  onCommentAdded: () => void;
}

export default function CommentModal({ post, onClose, onCommentAdded }: CommentModalProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [post._id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchComments = async () => {
    try {
      const commentsData = [];
      if (post.comments && post.comments.length > 0) {
        for (const commentId of post.comments) {
          try {
            const response = await axios.get(`/api/posts/${commentId}`);
            if (response.data.post) {
              commentsData.push(response.data.post);
            }
          } catch (error) {
            console.error('Error fetching comment:', error);
          }
        }
      }
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/posts/comment',
        {
          postId: post._id,
          content: newComment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNewComment('');
      fetchComments();
      onCommentAdded();
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl h-[600px] mx-4 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Comments ({comments.length})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="flex items-start space-x-3">
                <img
                  src={comment.author?.avatar || `https://ui-avatars.com/api/?name=${comment.author?.displayName}&background=0ea5e9&color=fff`}
                  alt={comment.author?.displayName}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {comment.author?.displayName}
                    </span>
                    <span className="text-gray-500 text-sm">
                      @{comment.author?.username}
                    </span>
                    <span className="text-gray-400 text-xs">
                      · {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              maxLength={1000}
            />
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

