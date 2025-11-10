'use client';

import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

interface FeedProps {
  user: any;
}

export default function Feed({ user }: FeedProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/posts', {
        params: { page: 1, limit: 50 },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost: any) => {
    setPosts([newPost, ...posts]);
    // Refresh posts to get latest from server
    setTimeout(() => {
      fetchPosts();
    }, 500);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <CreatePost user={user} onPostCreated={handlePostCreated} />
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No posts yet. Be the first to post!</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} user={user} />
          ))
        )}
      </div>
    </div>
  );
}

