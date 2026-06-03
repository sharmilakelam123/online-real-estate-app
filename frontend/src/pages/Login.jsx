import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../redux/store';
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginSuccess({
      user: { name: 'Demo User', email },
      token: 'mock-jwt-token'
    }));
    alert("Logged in successfully!");
    navigate('/');
  };
  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '24px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
      <h2 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>Sign In</h2>
      <form onSubmit={handleLoginSubmit}>
        <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        <button type="submit" style={{ width: '100%', backgroundColor: '#0054a6', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: '700', cursor: 'pointer' }}>Login</button>
      </form>
      <p style={{ fontSize: '13px', textAlign: 'center', marginTop: '16px' }}>Don't have an account? <Link to="/register" style={{ color: '#0054a6' }}>Register</Link></p>
    </div>
  );
}
