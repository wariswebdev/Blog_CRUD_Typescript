// src/utils/firebase.ts

// Firebase core modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTOcuO61HIR3SdciKQ0-UaJXZzJR7sY7Q",
  authDomain: "typescript-crud-blog.firebaseapp.com",
  projectId: "typescript-crud-blog",
  storageBucket: "typescript-crud-blog.firebasestorage.app",
  messagingSenderId: "26106861387",
  appId: "1:26106861387:web:aed5b6be26d3a37838bace",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export services for use in the app
export { app, db, auth, storage };
