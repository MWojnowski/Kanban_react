import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center text-gray-700 dark:text-gray-300 py-4 mt-0 border-t border-gray-300 dark:border-gray-700">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Mateusz Wojnowski 4a. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
