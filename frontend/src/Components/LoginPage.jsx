import React from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5ss9AZfvPoIl-b9ezkEt40irvuMD63Cg",
  authDomain: "skill-a4605.firebaseapp.com",
  projectId: "skill-a4605",
  storageBucket: "skill-a4605.firebasestorage.app",
  messagingSenderId: "43322803688",
  appId: "1:43322803688:web:550b4ad951a2b938dad05d",
  measurementId: "G-BRNZ447D2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function LoginPage({ onLogin }) {
  const handleGoogleLogin = async () => {
    const auth = getAuth(app); // Pass the initialized app to getAuth
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      onLogin(user); // Pass the user data to the parent component
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}

export default LoginPage;
