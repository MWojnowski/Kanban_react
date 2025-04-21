import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({setProjects}) => {

  useEffect(() => {
    fetch('/Projects/manifest.json')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });
  }, []);
  

  return (
    <div className="w-64 overflow-y-auto p-4 space-y-4 border-r bg-gray-200 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-800">
      <h2 className="text-xl font-bold">Profile</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to="/profile/projects"
            className="block p-2 rounded-md transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            to="/profile/board"
            className="block p-2 rounded-md transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700"
          >
            Board
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
