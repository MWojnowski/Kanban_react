import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import Board from './Board';
// import Projects from './Projects';

const Sidebar = (isLoggedIn) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/Projects/')
      .then((res) => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = [...doc.querySelectorAll('a')]
          .map((a) => a.getAttribute('href'))
          .filter((href) => href.endsWith('.csv'));
        setProjects(links);
      });
  }, []);

  if (!isLoggedIn) return <Navigate to="/" replace />;

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Sidebar</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/profile/projects" className="block p-2 bg-blue-700 rounded">Projects</Link>
          </li>
          <li>
            <Link to="/profile/board" className="block p-2 bg-blue-700 rounded">Board</Link>
          </li>
        </ul>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Detected Projects</h3>
          <ul className="text-sm space-y-1">
            {projects.map((p, i) => (
              <li key={i}>{p.replace('.csv', '')}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;