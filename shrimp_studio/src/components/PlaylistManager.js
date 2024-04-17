import React, { useState } from 'react';

const PlaylistManager = ({ songs = [], onSavePlaylist, playlists = [], onUpdatePlaylist }) => {
    const [playlistName, setPlaylistName] = useState('');
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    const handleSavePlaylist = () => {
        onSavePlaylist({ name: playlistName, songs: selectedSongs });
        setPlaylistName('');
        setSelectedSongs([]);
    };

    const handleAddSongsToPlaylist = () => {
        if (selectedPlaylist && selectedSongs.length > 0) {
            onUpdatePlaylist(selectedPlaylist, selectedSongs);
            setSelectedSongs([]);
        }
    };

    const handleSongSelection = (songId) => {
        setSelectedSongs((prevSelectedSongs) =>
            prevSelectedSongs.includes(songId)
                ? prevSelectedSongs.filter((id) => id !== songId)
                : [...prevSelectedSongs, songId]
        );
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name your playlist..."
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="playlist-filler"
            />
            <button className='playlist-button' onClick={handleSavePlaylist}>Save playlist</button>
            <div className = "playlist-dropdown">
                <select value={selectedPlaylist} onChange={(e) => setSelectedPlaylist(e.target.value)}>
                    <option value="">Select a playlist</option>
                    {playlists && playlists.map((playlist, index) => (
                        <option key={index} value={playlist.name}>{playlist.name}</option>
                    ))}
                </select>
                <button className='playlist-button' onClick={handleAddSongsToPlaylist}>Add songs</button>
            </div>
            <div>
                {songs && songs.map((song, index) => (
                    <div key={index}>
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            checked={selectedSongs.includes(song.songId)}
                            onChange={() => handleSongSelection(song.songId)}
                        />
                        {song.songName}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlaylistManager;
