import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SongList from './components/SongList';
import SignInandSignUp from './components/SignInandSignUp';
import AccountPage from './components/AccountPage';
import { useAuth } from './useAuth';
import NavigationBar from './components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import './ui.css'

function App() {
    const { user } = useAuth();
    const [refreshKey, setRefreshKey] = useState(0);
    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            const querySnapshot = await getDocs(collection(db, 'songs'));
            const fetchedSongs = querySnapshot.docs.map((doc) => ({
                songId: doc.id,
                ...doc.data(),
            }));
            setSongs(fetchedSongs);
        };

        fetchSongs();
    }, [refreshKey]);

    const handleUpdatePlaylist = (playlistName, newSongs) => {
        setPlaylists((prevPlaylists) =>
            prevPlaylists.map((playlist) =>
                playlist.name === playlistName
                    ? { ...playlist, songs: [...playlist.songs, ...newSongs] }
                    : playlist
            )
        );
    };

    return (
        <div className='everything'>
            <Router>
                <NavigationBar user={user} />
                <Routes>
                    <Route path="/signin" element={!user ? <SignInandSignUp /> : <Navigate to="/home" />} />
                    <Route path="/home" element={user ? (
                        <div className="container my-1" style={{ backgroundColor: 'black' }}>
                            <h1 className="main">Shrimp Studio</h1>
                            <div className="row">
                                <div className="col-md-4">
                                    <h3>Welcome to Shrimp Studio</h3>
                                    <p>Explore and share your music with the world!</p>
                                </div>
                                <div className="col-md-7">
                                    <h3>Your Songs</h3>
                                    <SongList userUid={user.uid} key={refreshKey} />
                                </div>
                            </div>
                        </div>
                    ) : <Navigate to="/signin" />} />
                    <Route path="/account" element={user ? <AccountPage songs={songs} playlists={playlists} onUploadSuccess={() => setRefreshKey((prevKey) => prevKey + 1)} onSavePlaylist={(newPlaylist) => setPlaylists([...playlists, newPlaylist])} onUpdatePlaylist={handleUpdatePlaylist} /> : <Navigate to="/signin" />} />
                    <Route path="/" element={<Navigate to="/signin" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
