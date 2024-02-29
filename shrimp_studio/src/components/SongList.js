import React, { useState, useEffect } from 'react';
import { listAll, getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase-config';

const SongList = ({ userUid }) => { // Accept the user's UID as a prop
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      if (userUid) { // Only fetch songs if the user's UID is available
        const musicRef = ref(storage, `music/${userUid}/`); // Use the user's UID to reference their specific folder
        const songList = await listAll(musicRef);
        const songUrls = await Promise.all(
          songList.items.map((item) => getDownloadURL(item))
        );
        setSongs(songUrls);
      }
    };

    fetchSongs();
  }, [userUid]); // Add userUid as a dependency to re-fetch songs when it changes

  return (
    <div>
      {songs.map((url, index) => (
        <audio key={index} src={url} controls />
      ))}
    </div>
  );
};

export default SongList;
