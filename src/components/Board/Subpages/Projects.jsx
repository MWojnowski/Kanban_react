import { useNavigate } from 'react-router-dom';

function Projects({ projects, setFile }) {
  const navigate = useNavigate();

  const handleClick = (projectName) => {
    setFile(projectName);
    navigate(`/profile/board?file=${projectName}`);
  };

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white">
          Your Projects
        </h1>
        {projects.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No projects found.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        )}
      </div>
    </>
  );
}

export default Projects;
