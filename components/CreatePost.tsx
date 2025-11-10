'use client';

import { useState } from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

interface CreatePostProps {
  user: any;
  onPostCreated: (post: any) => void;
}

export default function CreatePost({ user, onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/posts',
        {
          content,
          media,
          visibility: 'public',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onPostCreated(response.data.post);
      setContent('');
      setMedia([]);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start space-x-4">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=0ea5e9&color=fff`}
            alt={user?.displayName}
            className="h-10 w-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              rows={4}
              maxLength={10000}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-primary-600"
                  title="Add image"
                >
                  <ImageIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="text-sm text-gray-500">
                {content.length}/10000
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>{loading ? 'Posting...' : 'Post'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

