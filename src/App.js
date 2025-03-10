
import logo from './logo.svg';
import './App.css';
import SearchLogic from './containers/SearchLogic';
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const clientId = '80cc1be7cf93456f974e36911a2295f5';
  const redirectUri = 'http://localhost:3000/'; 

  const handleLogin = () => {
    const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = authUrl;
  };

  const handleReauthenticate = () => {
    setAccessToken(null); 
    localStorage.removeItem("spotifyToken"); 
    localStorage.removeItem("tokenTimestamp");
    handleLogin(); 
  };

  useEffect(() => {
    const parsedUrl = queryString.parse(window.location.hash);
    const token = parsedUrl.access_token;

    if (token) {
      setAccessToken(token);
    }
  }, []);
  
  useEffect(() => {
    if (accessToken) {
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (response.status === 401) {
            handleReauthenticate(); // Re-authenticate on 401
            return; // Exit the function to prevent further processing.
          }
          return response.json();
        })
        .then((data) => {
          setUserInfo(data);
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
        });
    }
  }, [accessToken]);

  return (
    <div className="App">
      <div>
      {accessToken ? (
        <div>
          <p>Logged in! Access Token: {accessToken.substring(0, 20)}...</p>
          {userInfo && (
            <div>
              <p>User ID: {userInfo.id}</p>
              <p>Display Name: {userInfo.display_name}</p>
              {userInfo.images && userInfo.images.length > 0 && (
                <img src={userInfo.images[0].url} alt="User Profile" />
              )}
            </div>
          )}
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Spotify</button>
      )}
    </div>
      <SearchLogic token={accessToken}/>
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
