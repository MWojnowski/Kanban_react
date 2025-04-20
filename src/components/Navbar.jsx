import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Moon, Sun, SquareKanban } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../index.css';

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark');
    } else {
      setDarkMode(false);
      document.body.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = 'https://kanbanreact-0v44--5173--fb22cd3d.local-corp.webcontainer.io/oauth-callback';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = githubAuthUrl;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow transition-all duration-300 ease-in-out">
      <Link to="/">
        <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300 ease-in-out flex items-center">
          <SquareKanban className="mr-2" />
          Kanban
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={toggleDarkMode}>
          <Moon className="hidden dark:block" />
          <Sun className="block dark:hidden" />
        </Button>

        <Button variant="ghost">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
        </Button>

        {isLoggedIn && (
          <>
            <Button variant="ghost">
              <Link to="/profile" className="hover:text-gray-400">
                Profile
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
          </>
        )}

        {!isLoggedIn && (
          <Button variant="outline" onClick={handleLogin}>
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}
