import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAajA2Cc_yhd7hkpOBn0qCF5q6rQ-7UK3Q",
  authDomain: "imaan-computer-world.firebaseapp.com",
  projectId: "imaan-computer-world",
  storageBucket: "imaan-computer-world.appspot.com",
  messagingSenderId: "118770528774",
  appId: "1:118770528774:web:bbfb2bca8b8d61829b4987",
  measurementId: "G-4M89RHKJZ3"
};


const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);