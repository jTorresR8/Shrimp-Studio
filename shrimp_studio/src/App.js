import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import SongList from './components/SongList';
import SignUp from './createUserWithEmailAndPassword';
import SignIn from './SignIn';
import { useAuth } from './useAuth'; 

function App() {
  const { user } = useAuth(); 
  const [refreshKey, setRefreshKey] = useState(0);
  const refreshSongs = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const authenticatedComponents = user ? (
    <div className="App">
      <h1>Music Upload</h1>
      <FileUpload onUploadSuccess={refreshSongs} />
      <SongList userUid={user.uid} key={refreshKey} onUploadSuccess={refreshSongs} />
    </div>
  ) : (
    <Navigate to="/signup" /> 
  );

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/home" />} />
        <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/home" />} />
        <Route path="/home" element={authenticatedComponents} />
        <Route path="/" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
