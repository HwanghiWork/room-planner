import React, { useState } from "react";
import { authService, firebaseInstance } from "fbase";
import "App.css";
import {
  InputGroup,
  FormControl
} from "react-bootstrap";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    console.log(name, value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data =
          await authService.createUserWithEmailAndPassword(
            email,
            password
          );
      } else {
        data = await authService.signInWithEmailAndPassword(
          email,
          password
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

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
