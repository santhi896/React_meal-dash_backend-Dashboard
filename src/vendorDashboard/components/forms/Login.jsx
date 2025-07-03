
import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const Login = ({ onLogin }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: Email, password: Password }),
      });
      const data = await response.json();

      if (!response.ok) {
        return setError(data.error || "Login failed.");
      }

      localStorage.setItem('loginToken', data.token);

      const vendorId = data.vendorId;
      if (vendorId) {
        const vendorRes = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
        const vendorData = await vendorRes.json();
        if (vendorRes.ok) {
          localStorage.setItem('firmId', vendorData.vendorFirmId);
          const firmName = vendorData.vendor?.firm?.[0]?.firmName;
          if (firmName) localStorage.setItem('firmName', firmName);
        }
      }

      onLogin(); // update parent's login state
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
//     <form className='authform' onSubmit={loginHandler}>
//       <h3>Vendor Login</h3>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <label>Email</label>
//       <input type="email" value={Email} onChange={e => setEmail(e.target.value)} required />
//       <label>Password</label>
//       <input type="password" value={Password} onChange={e => setPassword(e.target.value)} required />
//       <button type='submit'>Submit</button>
//     </form>
//   );
// };

    <div className="login-section">
      <form className='authform' onSubmit={loginHandler}>
        <h3>Vendor Login</h3><br />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <label>Email</label>
        <input
          type="text"
          name="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
        /><br />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
        /><br />

        <div className="btnsubmit">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};


export default Login;
