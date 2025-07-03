

import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const Register = ({ ShowLoginHandler }) => {
  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!UserName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: UserName,  // Match backend field names
          email,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setUserName("");
        setEmail("");
        setPassword("");
        alert("Vendor registered successfully");
        ShowLoginHandler(); // Call to show login form
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration failed", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerSection">
      <form className='authform' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3><br />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <label>User Name</label>
        <input
          type="text"
          name='userName'
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='Enter your name'
        /><br />

        <label>Email</label>
        <input
          type="text"
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
        /><br />

        <label>Password</label>
        <input
          type="password"
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
        /><br />

        <div className="btnsubmit">
          <button type='submit' disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
