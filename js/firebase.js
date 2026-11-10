import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7lnz7j0lRCNHabH0tPlFzDOkNiLoMMuM",
  authDomain: "studyraf-dd121.firebaseapp.com",
  projectId: "studyraf-dd121",
  storageBucket: "studyraf-dd121.firebasestorage.app",
  messagingSenderId: "986034620005",
  appId: "1:986034620005:web:3e7f12a3f31b5c846ca88c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
