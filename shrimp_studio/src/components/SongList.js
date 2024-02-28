import React, { useState, useEffect } from 'react';
import { listAll, getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase-config';

const SongList = () => {
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
      {songs.map((url, index) => (
        <audio key={index} src={url} controls />
      ))}
    </div>
  );
};

export default SongList;
