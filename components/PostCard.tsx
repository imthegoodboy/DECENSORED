'use client';

import { useState } from 'react';
import { Heart, Repeat2, MessageCircle, Gift, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import TipModal from './TipModal';

interface PostCardProps {
  post: any;
  user: any;
}

export default function PostCard({ post, user }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(
    post.likes?.some((like: any) => like._id === user?.id) || false
  );
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [showTipModal, setShowTipModal] = useState(false);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `/api/posts/${post._id}`,
        { action: 'like' },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-start space-x-4">
          <img
            src={post.author?.avatar || '/default-avatar.png'}
            alt={post.author?.displayName}
            className="h-12 w-12 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                {post.author?.displayName}
              </span>
              <span className="text-gray-500 text-sm">
                @{post.author?.username}
              </span>
              {post.author?.isVerified && (
                <span className="text-primary-600">✓</span>
              )}
              <span className="text-gray-400 text-sm">
                · {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </span>
            </div>

            {post.community && (
              <div className="mb-2">
                <span className="text-sm text-primary-600">
                  #{post.community.name}
                </span>
              </div>
            )}

            <p className="text-gray-800 dark:text-gray-200 mb-4 whitespace-pre-wrap">
              {post.content}
            </p>

            {post.media && post.media.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {post.media.map((url: string, idx: number) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Media ${idx + 1}`}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                ))}
              </div>
            )}

            {post.isPremium && (
              <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  🔒 Premium Content - {post.premiumPrice} {post.premiumToken}
                </p>
              </div>
            )}

            <div className="flex items-center space-x-6 text-gray-500">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 hover:text-red-600 ${
                  isLiked ? 'text-red-600' : ''
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likesCount}</span>
              </button>

              <button className="flex items-center space-x-2 hover:text-primary-600">
                <Repeat2 className="h-5 w-5" />
                <span>{post.reposts?.length || 0}</span>
              </button>

              <button className="flex items-center space-x-2 hover:text-primary-600">
                <MessageCircle className="h-5 w-5" />
                <span>{post.comments?.length || 0}</span>
              </button>

              <button
                onClick={() => setShowTipModal(true)}
                className="flex items-center space-x-2 hover:text-green-600"
              >
                <Gift className="h-5 w-5" />
                <span>Tip</span>
              </button>

              <a
                href={`https://ipfs.io/ipfs/${post.ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-primary-600"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-xs">View on IPFS</span>
              </a>
            </div>

            {post.totalTips > 0 && (
              <div className="mt-3 text-sm text-green-600">
                💰 Total Tips: {post.totalTips.toFixed(2)} {post.premiumToken || 'USDC'}
              </div>
            )}
          </div>
        </div>
      </div>

      {showTipModal && (
        <TipModal
          post={post}
          onClose={() => setShowTipModal(false)}
        />
      )}
    </>
  );
}

