import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb6dT4J_fKvsehRMCAyiC1qpD9-Ql1cxc",
  authDomain: "slimetalk-6ce32.firebaseapp.com",
  projectId: "slimetalk-6ce32",
  storageBucket: "slimetalk-6ce32.appspot.com",
  messagingSenderId: "82006092724",
  appId: "1:82006092724:web:168f5e6bf7c0fda752e0e1",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
