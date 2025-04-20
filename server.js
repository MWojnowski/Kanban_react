import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); 
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const frontendRedirectUri = 'https://kanbanreact-0v44--5173--fb22cd3d.local-corp.webcontainer.io/oauth-callback';

app.get('/api/auth/callback/github', async (req, res) => {
  const code = req.query.code;
  console.log('Backend received code:', code);

  if (code) {
    try {
      const tokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: githubClientId,
          client_secret: githubClientSecret,
          code: code,
          redirect_uri: frontendRedirectUri,
        },
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      const accessTokenData = tokenResponse.data;
      console.log('Backend access token data:', accessTokenData);

      if (accessTokenData.access_token) {
        const accessToken = accessTokenData.access_token;

        const userResponse = await axios.get('https://api.github.com/user', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const githubUserData = userResponse.data;
        console.log('Backend GitHub user data:', githubUserData);

        res.json({ user: githubUserData, message: 'GitHub login successful!' });

      } else {
        res.status(401).json({ error: 'Failed to retrieve access token from GitHub', details: accessTokenData });
      }

    } catch (error) {
      console.error('Backend error during GitHub token exchange:', error);
      res.status(500).json({ error: 'GitHub login failed', details: error.message });
    }
  } else {
    res.status(400).json({ error: 'Authorization code not provided' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});