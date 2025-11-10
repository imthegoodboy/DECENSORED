'use client';

import { Bell } from 'lucide-react';
import { useState } from 'react';

export default function NotificationBell() {
  const [hasNotifications, setHasNotifications] = useState(false);

  return (
    <button
      className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label="Notifications"
    >
      <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      {hasNotifications && (
        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
      )}
    </button>
  );
}

