import React, { useState } from "react";
import { authService, firebaseInstance } from "fbase";
import "App.css";

const Auth = () => {
  const [error, setError] = useState("");

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider =
        new firebaseInstance.auth.GoogleAuthProvider();
    }
    const data = await authService.signInWithPopup(
      provider
    );
  };

  return (
    <div>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
