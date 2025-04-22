import { useNavigate } from 'react-router-dom';
import {Plus} from "lucide-react";

const Projects = ({ projects, setFile }) => {
  const navigate = useNavigate();

  const handleClick = (projectName) => {
    setFile(projectName);
    navigate(`/profile/board?file=${projectName}`);
  };

  const handleNewProject = async () => {
    const name = prompt("Enter a name for the new project (no spaces, .csv will be added):");
    if (!name) return;

    const filename = `${name}.csv`;

    try {
      const response = await fetch('http://localhost:5000/api/create-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename }),
      });

      const result = await response.json();
      alert(result.message);

      if (response.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error("Error creating new project:", err);
    }
  };

  return (
      <div className="p-8 grow">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white">
          Your Projects
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div
              onClick={handleNewProject}
              className="border-2 border-dashed border-gray-400 dark:border-gray-600 flex items-center justify-center text-5xl text-gray-500 dark:text-gray-400 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer"
              style={{ minHeight: '150px' }}
          >
            <Plus/>
          </div>

          {projects.map((project, index) => (
              <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 p-6"
                  onClick={() => handleClick(project)}
              >
                <h2 className="text-xl font-semibold mb-2 capitalize">
                  {project.replace('.csv', '')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  File: {project}
                </p>
                <a
                    href={`/Projects/${project}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Download
                </a>
              </div>
          ))}
        </div>
      </div>
  );
};

export default Projects;
