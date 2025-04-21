import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './elements/Sidebar';



const ProfilePage = ({projects,setProjects,isLoggedIn}) => {

  if (!isLoggedIn) return <Navigate to="/" replace />;

  return (
    <div className="max-h-full flex-1 flex">
      <Sidebar setProjects={setProjects} projects={projects}/>
      <Outlet />
    </div>
  );
}

export default ProfilePage;