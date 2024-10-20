import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfnY_glw_k6Ub7X0KejCTG2cYcwp6wv3Q",
  authDomain: "chat-app-e544f.firebaseapp.com",
  projectId: "chat-app-e544f",
  storageBucket: "chat-app-e544f.appspot.com",
  messagingSenderId: "301846430720",
  appId: "1:301846430720:web:af40cd802b2a3a0e60c4e5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const projectFirestore = getFirestore(app);

const timestamps = serverTimestamp;

export { projectFirestore, timestamps, auth, createUserWithEmailAndPassword };
