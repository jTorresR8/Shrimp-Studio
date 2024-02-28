import { getStorage, ref, listAll } from "firebase/storage";
import React, { useState, useEffect } from 'react';



const storage = getStorage();
const songs = [];

// Create a reference under which you want to list
const listRef = ref(storage, 'music/');

// Find all the prefixes and items.
listAll(listRef)
  .then((res) => {
    res.items.forEach((itemRef) => {
      console.log(itemRef.name);
      songs.push(itemRef.name);
    });
  }).catch((error) => {
  });

  function SongLists() {
    return (
      <ol>
        {songs.map((song) => (
          <li>{song}</li>
        ))}
      </ol>
    );
  }

  export {listAll, SongLists};

