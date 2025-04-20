import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Board/Profile';
import OAuthCallback from './api/auth/callback/github/OAuthCallback';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={<Profile isLoggedIn={isLoggedIn} />}
          />
           <Route path="/oauth-callback" element={<OAuthCallback setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
