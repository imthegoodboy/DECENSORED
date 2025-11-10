'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { User, Hash } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any>({ posts: [], users: [], communities: [] });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (query) {
      search();
    }
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ id: 'current' });
    }
  }, [query]);

  const search = async () => {
    try {
      const response = await axios.get(`/api/search?q=${encodeURIComponent(query)}`);
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Search Results for "{query}"
        </h1>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : (
          <div className="space-y-6">
            {results.users.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Users
                </h2>
                <div className="space-y-2">
                  {results.users.map((user: any) => (
                    <Link
                      key={user._id}
                      href={`/profile/${user.walletAddress}`}
                      className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar || `https://ui-avatars.com/api/?name=${user.displayName}&background=0ea5e9&color=fff`}
                          alt={user.displayName}
                          className="h-12 w-12 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {user.displayName}
                          </p>
                          <p className="text-sm text-gray-500">@{user.username}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {results.posts.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Posts
                </h2>
                <div className="space-y-0 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                  {results.posts.map((post: any) => (
                    <PostCard key={post._id} post={post} user={user} />
                  ))}
                </div>
              </div>
            )}

            {results.communities.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Communities
                </h2>
                <div className="space-y-2">
                  {results.communities.map((community: any) => (
                    <Link
                      key={community._id}
                      href={`/communities/${community.slug}`}
                      className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                          <Hash className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {community.name}
                          </p>
                          <p className="text-sm text-gray-500">#{community.slug}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {!loading && results.posts.length === 0 && results.users.length === 0 && results.communities.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>No results found for "{query}"</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

