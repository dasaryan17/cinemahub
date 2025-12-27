import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';

// Maine yahan se ', Link' hata diya hai warning khatam karne ke liye
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Admin Credentials
    const ADMIN_EMAIL = 'admin@cinemahub.com';
    const ADMIN_PW = 'admin123';

    if (email === ADMIN_EMAIL && password === ADMIN_PW) {
      const adminUser = { 
        email: email, 
        role: 'admin',  
      };
      login(adminUser); 
      alert("Welcome Admin!");
      navigate('/'); // Ya jo bhi aapka admin path ho
    } 
    else {
      alert("Invalid Credentials! Filling Admin details for quick access.");
      setEmail(ADMIN_EMAIL);
      setPassword(ADMIN_PW);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 style={{ color: '#f5c518', marginBottom: '20px', textAlign: 'center' }}>LOGIN</h2>
        
        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{ marginBottom: '20px' }}>
            <label style={{ color: '#aaa', display: 'block', marginBottom: '8px' }}>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>

          <div className="input-group" style={{ marginBottom: '30px' }}>
            <label style={{ color: '#aaa', display: 'block', marginBottom: '8px' }}>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit" className="login-btn">
            LOGIN
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <button 
                type="button"
                onClick={() => { setEmail('admin@cinemahub.com'); setPassword('admin123'); }}
                style={{ background: 'none', border: 'none', color: '#f5c518', cursor: 'pointer', fontSize: '0.9rem' }}
            >
                Use Admin Credentials?
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;