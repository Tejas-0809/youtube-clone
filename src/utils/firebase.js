import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJQyR2DsaSr41nFlkqFx4uqfgJEDaL8eo",
  authDomain: "clone-b513b.firebaseapp.com",
  projectId: "clone-b513b",
  storageBucket: "clone-b513b.appspot.com",
  messagingSenderId: "713466630775",
  appId: "1:713466630775:web:fbc8878849fe5de52d2c72",
  measurementId: "G-6Q35K6M0VG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google provider to avoid CORS issues
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export default app;