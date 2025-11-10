'use client';

interface EmojiSelectorProps {
  selectedEmoji: string;
  onSelect: (emoji: string) => void;
}

export default function EmojiSelector({ selectedEmoji, onSelect }: EmojiSelectorProps) {
  const emojis = ['🥺', '🤕', '😭', '😗', '😂'];

  return (
    <div className="flex items-center space-x-3">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect(emoji)}
          className={`text-4xl p-2 rounded-lg border-2 transition-all ${
            selectedEmoji === emoji
              ? 'border-primary-600 bg-primary-50 dark:bg-primary-900 scale-110'
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:scale-105'
          }`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}

