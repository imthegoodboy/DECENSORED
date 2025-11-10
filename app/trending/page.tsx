'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import { TrendingUp, Flame } from 'lucide-react';

export default function TrendingPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchTrendingPosts();
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ id: 'current' });
    }
  }, []);

  const fetchTrendingPosts = async () => {
    try {
      const response = await axios.get('/api/posts/trending');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching trending posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Flame className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Trending
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            The most popular posts right now
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading trending posts...</div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {posts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No trending posts yet. Be the first to create one!</p>
                </div>
              ) : (
                posts.map((post, index) => (
                  <div key={post._id} className="relative">
                    {index < 3 && (
                      <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>#{index + 1}</span>
                      </div>
                    )}
                    <PostCard post={post} user={user} />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

