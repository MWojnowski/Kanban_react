import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './elements/Sidebar';


function ProfilePage({ isLoggedIn }) {
  if (!isLoggedIn) return <Navigate to="/" replace />;

  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default ProfilePage;