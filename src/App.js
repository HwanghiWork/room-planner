/* eslint-disable */

import React, { useState, useEffect } from "react";
import AppRouter from "Router";
import { authService } from "fbase";

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
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setUserObject({});
          }}
        >
          로그아웃
        </button>
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
