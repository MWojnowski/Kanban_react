import {Navigate} from 'react-router-dom';
import Sidebar from './Sidebar';
import Board from './Board';

function ProfilePage({isLoggedIn}) {

 if (!isLoggedIn) return <Navigate to="/" replace />;

  return (
    <>
      <Sidebar/>
      <Board/>
    </>
  );
}

export default ProfilePage;
