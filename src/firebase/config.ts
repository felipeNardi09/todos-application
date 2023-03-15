import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwpujM558xbwvL5D-yK-tyV0GH0VxyLQg",
  authDomain: "todo-app-7bc13.firebaseapp.com",
  projectId: "todo-app-7bc13",
  storageBucket: "todo-app-7bc13.appspot.com",
  messagingSenderId: "310959663912",
  appId: "1:310959663912:web:6d81bba55593529f343e1d",
  measurementId: "G-QMDTWT3XX1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
