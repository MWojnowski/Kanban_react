import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthCallback = ({ setIsLoggedIn }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get('code');

    if (code) {
      fetch(`/api/auth/callback/github?code=${code}`) // <--- Calls your backend
        .then((res) => res.json())
        .then((data) => {
          console.log('Logged in user:', data);
          setIsLoggedIn(true);
          console.log('isLoggedIn set to true');
          navigate('/profile');
        })
        .catch((err) => {
          console.error('Login failed', err);
          navigate('/');
        });
    } else {
      console.log('No code received from GitHub.');
      navigate('/');
    }
  }, [params, setIsLoggedIn, navigate]);

  return (
    <div>
      <p>Processing login...</p>
    </div>
  );
};

export default OAuthCallback;