import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { storage, db } from '../firebase-config'; // Adjust based on your file structure

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const auth = getAuth();

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const storageRef = ref(storage, `music/${user.uid}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Create a document in Firestore with the song metadata
    await setDoc(doc(db, "songs", snapshot.ref.name), {
      userId: user.uid,
      songName: file.name,
      songPath: snapshot.ref.fullPath,
      downloadURL: downloadURL,
      uploadDate: new Date()
    });

    console.log('Uploaded a blob or file!', downloadURL);

    // Call the callback function after successful upload
    if (onUploadSuccess) {
      onUploadSuccess();
    }
  };

  return (
    <div className='file-upload'>
      <input type="file" onChange={handleChange} accept="audio/mp3" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
