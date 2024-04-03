import { getStorage, ref, listAll } from "firebase/storage";
import React, { useState, useEffect } from 'react';

const storage = getStorage();

function SongLists() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const listRef = ref(storage, 'music/');
    listAll(listRef)
      .then((res) => {
        const songNames = res.items.map((itemRef) => itemRef.name);
        setSongs(songNames);
      })
      .catch((error) => {
        console.error("Error listing songs:", error);
      });
  }, []);

  return (
    <ol>
      {songs.map((song, index) => (
        <li key={index}>{song}</li>
      ))}
    </ol>
  );
}

export { SongLists };
