import React, { useState } from 'react';
import login from '../utilities/login.js';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    login(formData)
      .then((res) => {
        setFormData((prevVal) => ({...prevVal, username: '', password: '' }))
        console.log(res);
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

  return (
    <div className="App">
      <div className="login-container">
        <form className="form" onSubmit={handleFormSubmit}>
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
        </form>
      </div>
    </div>
  );
};
