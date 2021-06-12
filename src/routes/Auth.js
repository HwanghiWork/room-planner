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
      <form onSubmit={onSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text
              id="inputGroup-sizing-default"
              name="email"
              type="email"
              required
              value={email}
              onChange={onChange}
            >
              사용자ID
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text
              id="inputGroup-sizing-default"
              name="password"
              type="password"
              required
              value={password}
              onChange={onChange}
            >
              비밀번호
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <div className="d-flex">
        <input
          type="submit"
          value={"회원가입"}
        />
        <input
          type="submit"
          value={"로그인"}
        />
        </div>
      </form>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
