'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Users, Plus } from 'lucide-react';

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchCommunities();
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ id: 'current' });
    }
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await axios.get('/api/communities');
      setCommunities(response.data.communities);
    } catch (error) {
      console.error('Error fetching communities:', error);
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Communities
          </h1>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            <Plus className="h-5 w-5" />
            <span>Create Community</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p>No communities yet. Create the first one!</p>
            </div>
          ) : (
            communities.map((community) => (
              <Link
                key={community._id}
                href={`/communities/${community.slug}`}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={community.avatar || '/default-community.png'}
                    alt={community.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {community.name}
                    </h3>
                    <p className="text-sm text-gray-500">#{community.slug}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {community.description}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>{community.members?.length || 0} members</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

