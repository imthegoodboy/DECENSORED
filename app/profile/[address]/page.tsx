'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import { User as UserIcon, Users, Gift, TrendingUp } from 'lucide-react';

export default function ProfilePage() {
  const params = useParams();
  const address = (params?.address as string) || '';
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, decode JWT to get user
      setCurrentUser({ id: 'current' });
    }
  }, [address]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/users/${address}`);
      setUser(response.data.user);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">User not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={currentUser} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 mb-6">
          <div className="flex items-start space-x-6">
            <img
              src={user.avatar || '/default-avatar.png'}
              alt={user.displayName}
              className="h-24 w-24 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.displayName}
                </h1>
                {user.isVerified && (
                  <span className="text-primary-600 text-xl">✓</span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                @{user.username}
              </p>
              {user.bio && (
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {user.bio}
                </p>
              )}
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="font-semibold">{user.followersCount}</span>
                  <span className="text-gray-500">Followers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                  <span className="font-semibold">{user.followingCount}</span>
                  <span className="text-gray-500">Following</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-gray-500" />
                  <span className="font-semibold">{user.reputation}</span>
                  <span className="text-gray-500">Reputation</span>
                </div>
              </div>
              {user.subscriptionPrice > 0 && (
                <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900 rounded-lg">
                  <p className="text-sm text-primary-800 dark:text-primary-200">
                    💎 Premium Subscription: {user.subscriptionPrice} {user.subscriptionToken}/month
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button className="flex-1 py-4 px-6 text-center font-semibold text-gray-900 dark:text-white border-b-2 border-primary-600">
              Posts ({posts.length})
            </button>
            <button className="flex-1 py-4 px-6 text-center font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Media
            </button>
            <button className="flex-1 py-4 px-6 text-center font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Likes
            </button>
          </div>
          <div className="space-y-0">
            {posts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No posts yet.</p>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post._id} className="border-b border-gray-200 dark:border-gray-700">
                  <PostCard post={post} user={currentUser} />
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

