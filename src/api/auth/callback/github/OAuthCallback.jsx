import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthCallback = ({ setIsLoggedIn }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const error = params.get('error');
    const errorDescription = params.get('error_description');
    const errorUri = params.get('error_uri');
    const code = params.get('code');

    if (error) {
      console.error('GitHub OAuth Error:', error, errorDescription, errorUri);
      alert(`GitHub Login Failed: ${error_description || error}`);
      navigate('/');
    } else if (code) {
      fetch(`/api/auth/callback/github?code=${code}`)
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
      console.log('No code or error received from GitHub.');
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