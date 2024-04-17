import React, { useState, useEffect, useRef } from 'react';
import { listAll, getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase-config';
import '../SongList.css'; // Import the CSS file for styling

const SongList = ({ userUid }) => {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchSongs = async () => {
      if (userUid) {
        const musicRef = ref(storage, `music/${userUid}/`);
        const songList = await listAll(musicRef);
        const songData = await Promise.all(
          songList.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { songName: item.name, downloadURL: url };
          })
        );
        setSongs(songData);
      }
    };

    fetchSongs();
  }, [userUid]);

  const handleSongSelection = (song) => {
    setSelectedSong(song);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  return (
    <div>
      <input
        type="text"
        className = "search-input"
        placeholder="Search for a song..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        {songs
          .filter((song) =>
            song.songName.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((song, index) => (
            <div key={index} onClick={() => handleSongSelection(song)}>
              <p>{song.songName}</p>
            </div>
          ))}
      </div>
      {selectedSong && (
        <div className="music-player-container">
          <audio ref={audioRef} controls className="music-player">
            <source src={selectedSong.downloadURL} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </div>
  );
};

export default SongList;
