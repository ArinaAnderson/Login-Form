import React from 'react';
import useLocationHash from '../utilities/useLocationHash.js';
import LoginUseState from './Login-useState.jsx';
import LoginUseReducer from './Login-useReducer.jsx';

export default function Login() {
  const hash = useLocationHash();

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
