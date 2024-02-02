import React, { useState, useRef, useReducer } from 'react';
import LoginUseState from './Login-useState.js';
import LoginUseReducer from './Login-useReducer.js';

export default function Login() {
  const [hash, setHash] = useState(window.location.hash);

  return (
    <>
      {!hash && (
        <div className="App App-column">
          <p><a href="#useState">useState</a></p>
          <p><a href="#useReducer">useReducer</a></p>
        </div>
      )}
      {hash === 'useState' && <LoginUseState />}
      {hash === 'useReducer' && <LoginUseReducer />}
    </>
  );
};
