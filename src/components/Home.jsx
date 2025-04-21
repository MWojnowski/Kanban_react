import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, BarChart2, Users, SquareKanban } from 'lucide-react';
import { Button } from './ui/Button';

const Home = () => {
  return (
    <div className="h-full flex-1 flex flex-col items-center justify-center  bg-gray-150 dark:bg-gray-900 text-gray-800 dark:text-white p-4">
      <div className="text-center mb-8">
        <SquareKanban className="w-24 h-24 mx-auto mb-4" />
        <h1 className="text-5xl font-bold mb-4">Welcome to Kanban App</h1>
        <p className="text-lg mb-6">
          Organize your tasks efficiently with our Kanban board. Move tasks
          between different stages and keep track of your progress.
        </p>
        <Link to="/profile">
          <Button variant="default" size="lg">
            Get Started
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg dark:bg-gray-700 dark:text-white">
          <CheckSquare className="text-4xl mb-4" />
          <h2 className="text-2xl font-semibold">Manage Tasks</h2>
          <p>
            Effortlessly create and manage your tasks with a user-friendly
            interface.
          </p>
        </div>
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg dark:bg-gray-700 dark:text-white">
          <BarChart2 className="text-4xl mb-4" />
          <h2 className="text-2xl font-semibold">Track Progress</h2>
          <p>
            Visualize your progress and stay on top of your tasks with our
            Kanban board.
          </p>
        </div>
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg dark:bg-gray-700 dark:text-white">
          <Users className="text-4xl mb-4" />
          <h2 className="text-2xl font-semibold">Collaborate</h2>
          <p>Work together with your team and share tasks seamlessly.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
