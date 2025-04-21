import { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProfilePage from './components/Board/ProfilePage'
import Board from './components/Board/Subpages/Board';
import Projects from './components/Board/Subpages/Projects';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    return savedLoginStatus ? JSON.parse(savedLoginStatus) : false;
  });
  const [projects,setProjects] = useState([])
  const [file,setFile] = useState('board_data.csv')

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage projects={projects} setProjects={setProjects} isLoggedIn={isLoggedIn} />}>
            <Route index element={<Board  file={file}/>} />
            <Route path="board" element={<Board file={file}/>} />
            <Route path="projects" element={<Projects projects={projects} setFile={setFile}/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
