import React, { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase-config';

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const musicRef = ref(storage, 'music/');
      const songList = await listAll(musicRef);
      const songUrls = await Promise.all(
        songList.items.map((item) => getDownloadURL(item))
      );
      setSongs(songUrls);
    };

    fetchSongs();
  }, []);

  return (
    <div>
      <h2>Music List</h2>
      {songs.map((url, index) => (
        <div key={index}>
          <audio src={url} controls />
        </div>
      ))}
    </div>
  );
};

export default MusicPlayer;
