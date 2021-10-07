import React, { useState } from "react";
import { authService, firebaseInstance } from "fbase";
import "App.css";
import {
  FormControl,
  Button
} from "react-bootstrap";



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
    <div className="로그인">
      {/* {<form onSubmit={onSubmit}>
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
      </form>} */}
      <img src={process.env.PUBLIC_URL + '/images/Logo.PNG'} />
      <div className="가운데정렬 위쪽마진">
        <Button variant="outline-info" onClick={onSocialClick} name="google" >
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Auth;
