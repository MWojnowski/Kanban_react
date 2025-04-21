import { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProfilePage from './components/Board/ProfilePage'
import Board from './components/Board/Subpages/Board';
import Projects from './components/Board/Subpages/Projects';
import Footer from './components/Footer';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    return savedLoginStatus ? JSON.parse(savedLoginStatus) : false;
  });

  const [projects, setProjects] = useState([]);
  const [file, setFile] = useState('example.csv');

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen flex flex-col">
      <Router >
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="flex-1 h-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={
              <ProfilePage
                projects={projects}
                setProjects={setProjects}
                isLoggedIn={isLoggedIn}
              />
            }>
              <Route index element={<Board file={file} />} />
              <Route path="board" element={<Board file={file} />} />
              <Route path="projects" element={<Projects projects={projects} setFile={setFile} />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </Router>
      </div>
  );
}

export default App;
