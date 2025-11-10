'use client';

export const dynamic = 'force-dynamic';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { ArrowLeft, Users, Hash } from 'lucide-react';

export default function CommunityPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';
  const [community, setCommunity] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      fetchCommunity();
    }
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ id: 'current' });
    }
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCommunity = async () => {
    try {
      const response = await axios.get(`/api/communities/${slug}`);
      setCommunity(response.data.community);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching community:', error);
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

  if (!community) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Community not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/communities"
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Communities</span>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 mb-6">
          <div className="flex items-start space-x-6">
            <div className="h-24 w-24 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              {community.avatar ? (
                <img src={community.avatar} alt={community.name} className="h-24 w-24 rounded-full" />
              ) : (
                <Hash className="h-12 w-12 text-primary-600 dark:text-primary-400" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {community.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                #{community.slug}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {community.description}
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="font-semibold">{community.members?.length || 0}</span>
                  <span className="text-gray-500">Members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Hash className="h-5 w-5 text-gray-500" />
                  <span className="font-semibold">{posts.length}</span>
                  <span className="text-gray-500">Posts</span>
                </div>
              </div>
            </div>
          </div>

          {community.rules && community.rules.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Community Rules
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                {community.rules.map((rule: string, index: number) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Posts ({posts.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {posts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No posts in this community yet. Be the first to post!</p>
              </div>
            ) : (
              posts.map((post) => (
                <PostCard key={post._id} post={post} user={user} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

