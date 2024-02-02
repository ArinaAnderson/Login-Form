import React, { useState, useEffect } from 'react';
import LoginUseState from './Login-useState.jsx';
import LoginUseReducer from './Login-useReducer.jsx';

export default function Login() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      console.log(window.location.hash);
      setHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      {!hash && (
        <div className="App App-column">
          <p><a href="#useState">useState</a></p>
          <p><a href="#useReducer">useReducer</a></p>
        </div>
      )}
      {hash === '#useState' && <LoginUseState />}
      {hash === '#useReducer' && <LoginUseReducer />}
    </>
  );
};
