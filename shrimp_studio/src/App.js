import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SongList from './components/SongList';
import SignInandSignUp from './components/SignInandSignUp';
import AccountPage from './components/AccountPage';
import { useAuth } from './useAuth';
import NavigationBar from './components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Router>
      <NavigationBar user={user} />
      <Routes>
        <Route path="/signin" element={!user ? <SignInandSignUp /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? (
          <div className="App container">
            <h1 className="my-4">Shrimp Studio</h1>
            <div className="row">
              <div className="col-md-6">
                <h3>Welcome to Shrimp Studio</h3>
                <p>Explore and share your music with the world!</p>
              </div>
              <div className="col-md-6">
                <h3>My Songs</h3>
                <SongList userUid={user.uid} key={refreshKey} />
              </div>
            </div>
          </div>
        ) : <Navigate to="/signin" />} />
        <Route path="/account" element={user ? <AccountPage onUploadSuccess={() => setRefreshKey((prevKey) => prevKey + 1)} /> : <Navigate to="/signin" />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
