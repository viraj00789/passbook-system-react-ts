'use client';

import { useTheme } from './ThemesProvider';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <FaMoon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      ) : (
        <FaSun className="w-5 h-5 text-yellow-500" />
      )}
    </button>
  );
}
