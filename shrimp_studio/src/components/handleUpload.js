// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// const handleUpload = async () => {
//   if (!file) return;

//   const storageRef = ref(storage, `music/${file.name}`);
//   const snapshot = await uploadBytes(storageRef, file);
//   console.log('Uploaded a blob or file!', snapshot);

//   // Get the download URL
//   const downloadURL = await getDownloadURL(snapshot.ref);
//   console.log('File available at', downloadURL);

//   // You can store this URL in Firestore or your app's state for later use
// };
