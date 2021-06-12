/* eslint-disable */

import React, { useState, useEffect } from "react";
import AppRouter from "Router";
import { authService } from "fbase";
import { Button } from 'react-bootstrap';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObject] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setIsLoggedIn(true);
        setUserObject(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {isLoggedIn && (
        <Button variant="outline-info" className="m-1"
          onClick={() => {
            
            authService.signOut().then(() => {
              // Sign-out successful.
              setIsLoggedIn(false);
            }).catch((error) => {
              // An error happened.
              console.log(error);
            });
          }}
        >
          로그아웃
        </Button>
      )}
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
