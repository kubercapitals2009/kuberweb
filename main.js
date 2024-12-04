// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set, onValue, push } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYq7emwuBE5umqLsPOVuSAuFVof8AKtsY",
  authDomain: "kuber-capitals-670d4.firebaseapp.com",
  databaseURL: "https://kuber-capitals-670d4-default-rtdb.firebaseio.com",
  projectId: "kuber-capitals-670d4",
  storageBucket: "kuber-capitals-670d4.appspot.com",
  messagingSenderId: "1047880352488",
  appId: "1:1047880352488:web:4b8ab2ed1ed5cac6a2bf5d",
  measurementId: "G-H6N1MTGHHP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

// DOM Elements
const fileInput = document.getElementById("file-input");
const uploadButton = document.getElementById("upload-button");
const photoGallery = document.getElementById("photo-gallery");

// Upload Photo
uploadButton.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  const fileRef = storageRef(storage, `photos/${file.name}`);
  try {
    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Save the file URL in Firebase Realtime Database
    const photoRef = push(ref(database, "photos"));
    await set(photoRef, {
      url: downloadURL,
      name: file.name,
      timestamp: Date.now(),
    });

    alert("Photo uploaded successfully!");
    displayPhoto(downloadURL); // Display uploaded photo immediately
  } catch (error) {
    console.error("Error uploading photo:", error);
    alert("Failed to upload photo.");
  }
});

// Fetch and Display Photos
const loadPhotos = () => {
  const photosRef = ref(database, "photos");
  onValue(photosRef, (snapshot) => {
    photoGallery.innerHTML = ""; // Clear gallery
    const photos = snapshot.val();
    if (photos) {
      Object.values(photos).forEach((photo) => {
        displayPhoto(photo.url);
      });
    }
  });
};

// Display Photo
const displayPhoto = (url) => {
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Uploaded Photo";
  img.style.width = "200px";
  img.style.height = "200px";
  img.style.margin = "10px";
  img.style.borderRadius = "10px";
  img.style.objectFit = "cover";
  photoGallery.appendChild(img);
};

// Load photos on page load
window.onload = loadPhotos;
