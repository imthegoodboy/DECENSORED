'use client';

import { Share2 } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
  postId: string;
  postContent: string;
}

export default function ShareButton({ postId, postContent }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/posts/${postId}`;
    const text = `${postContent.substring(0, 100)}...`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this post on DECENSORED',
          text,
          url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center space-x-2 hover:text-primary-600 transition-colors"
      title="Share post"
    >
      <Share2 className="h-5 w-5" />
      {copied && <span className="text-xs text-green-600">Copied!</span>}
    </button>
  );
}

