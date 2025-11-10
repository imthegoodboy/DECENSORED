'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import axios from 'axios';

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSeed = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('/api/seed');
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to seed data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Seed Dummy Data
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This will create dummy users, posts, and a tech community for testing.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {result && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-200 rounded-lg">
            <p className="font-semibold">Success!</p>
            <p>Created {result.users} users, {result.posts} posts, and {result.communities} community</p>
          </div>
        )}

        <button
          onClick={handleSeed}
          disabled={loading}
          className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Seeding data...' : 'Seed Dummy Data'}
        </button>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Visit <a href="/" className="text-primary-600 hover:underline">Home</a> to see the feed
        </p>
      </div>
    </div>
  );
}

