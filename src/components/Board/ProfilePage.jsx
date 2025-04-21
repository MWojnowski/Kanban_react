import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './elements/Sidebar';



function ProfilePage({projects,setProjects,isLoggedIn}) {

  if (!isLoggedIn) return <Navigate to="/" replace />;

  return (
    <div className="flex">
      <Sidebar setProjects={setProjects} projects={projects} />
      <Outlet />
    </div>
  );
}

export default ProfilePage;