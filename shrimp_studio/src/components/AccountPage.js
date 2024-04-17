import React from 'react';
import FileUpload from './FileUpload';
import PlaylistManager from './PlaylistManager';

const AccountPage = ({ playlists = [], songs = [], onUploadSuccess, onSavePlaylist, onUpdatePlaylist }) => {
    return (
        <div className="container my-1">
            <div className = "account-header">
                <h1>My Account</h1>
                <div className="my-4">
                    <h3>Music Upload</h3>
                    <FileUpload onUploadSuccess={onUploadSuccess} />
                </div>
            </div>
            <div className='row'>
                <div className="col-md-4">
                    <h3>Playlist Manager</h3>
                    <PlaylistManager
                        songs={songs}
                        onSavePlaylist={onSavePlaylist}
                        playlists={playlists}
                        onUpdatePlaylist={onUpdatePlaylist}
                    />
                </div>
                <div className="col-md-7">
                    <h3>Your Playlists</h3>
                    {playlists && playlists.length > 0 ? (
                        playlists.map((playlist, index) => (
                            <div key={index} className="my-2">
                                <h4>{playlist.name}</h4>
                                <ul>
                                    {playlist.songs && playlist.songs.map((songId) => (
                                        <li key={songId}>{songs && songs.find((song) => song.songId === songId)?.songName}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>You have no playlists.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default AccountPage;
