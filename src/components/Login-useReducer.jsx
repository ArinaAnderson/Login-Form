import React, { useState, useRef, useReducer } from 'react';
import login from '../utilities/login.js';

// state arg is the latest state snapshot of the state that gets managed by useReducer
const loginReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
      case 'SUCCESS':
        return {
          ...state,
          formData: { username: '', email: '' },
          isLoading: false,
          isLoggedIn: true,
        };
      case 'ERROR':
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };
      case 'LOGGED-OUT':
        return {
          ...state,
          isLoggedIn: false,
        }
      case 'FILL-FORM':
        return {
          ...state,
          formData: {...state.formData, [action.payload.name]: action.payload.value}
        };
    default:
      return state;
  }
};

const initState = {
  formData: { username: '', password: '' },
  isLoading: false,
  isLoggedIn: false,
  error: null,
}; 

export default function LoginUseReducer() {
  const [state, dispatch] = useReducer(loginReducer, initState);

  const {
    formData,
    isLoading,
    isLoggedIn,
    error,
  } = state;

  const submittedFormData = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch({type: 'LOGIN'});

    login(formData)
      .then((res) => {
        submittedFormData.current = formData;
        console.log(res); // Success! Meow!
        dispatch({type: 'SUCCESS'})
      })
      .catch((e) => {
        dispatch({ type: 'ERROR', payload: `Error is ${e}`});
        console.log(`Error: ${e}`); // Fail...Rrrrr
      })
      // .finally(() => setIsLoading(false));
  };

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    // setFormData((prevVal) => ({...prevVal, [fieldName]: e.target.value }));
    dispatch({ type: 'FILL-FORM', payload: { name: fieldName, value: e.target.value }});
  };

  const handleLogOut = () => {
    dispatch({type: 'LOGGED-OUT'});
  };

  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Privet, {submittedFormData.current.username}!</h1>
            <button type="button" onClick={handleLogOut}>Log out</button>
          </>
        ) : (
        <form className="form" onSubmit={handleFormSubmit}>
          {error ? <p className="error">Please eneter right format data</p> : ''}
          <p>It is time to Login...</p>
          <div>
            <input
              value={formData.username}
              onChange={handleInputChange}
              name="username"
              type="text"
              placeholder="username"
            />
          </div>
          <div>
            <input
              value={formData.password}
              onChange={handleInputChange}
              name="password" type="password"
              placeholder="passowrd"
              autoComplete="new-password" />
          </div>
          <button className="btn-submit" type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>)}
      </div>
    </div>
  );
};
