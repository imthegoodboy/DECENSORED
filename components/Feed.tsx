'use client';

import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
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
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/posts', {
        params: { page, limit: 20 },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost: any) => {
    setPosts([newPost, ...posts]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Loading feed...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CreatePost user={user} onPostCreated={handlePostCreated} />
      
      <div className="space-y-4">
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

