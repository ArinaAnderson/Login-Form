import React, { useState, useRef } from 'react';
import login from '../utilities/login.js';

export default function LoginUseState() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const submittedFormData = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    login(formData)
      .then((res) => {
        submittedFormData.current = formData;
        setFormData((prevVal) => ({...prevVal, username: '', password: '' }));
        setError(null);
        setIsLoggedIn(true);
        console.log(res); // Success! Meow!
      })
      .catch((e) => {
        setError(e)
        console.log(`Error: ${e}`);
      })
      .finally(() => setIsLoading(false));
  };

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    console.log(e.target.name);
    setFormData((prevVal) => ({...prevVal, [fieldName]: e.target.value}))
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
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
