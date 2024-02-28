import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase-config';

const FileUpload = ({ onUploadSuccess }) => {  // Accept the callback as a prop
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const storageRef = ref(storage, `music/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Uploaded a blob or file!', downloadURL);

    // Call the callback function after successful upload
    if (onUploadSuccess) {
      onUploadSuccess();
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} accept="audio/mp3" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
