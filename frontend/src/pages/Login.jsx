import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';
import '../App.css';

const users = [
  { email: 'admin@CRM.com', password: 'admin123', role: 'admin' },
  { email: 'sales@CRM.com', password: 'sales123', role: 'sales' },
  { email: 'user@CRM.com', password: 'user123', role: 'user' }
];

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        login(data.user, data.token, data.role);
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Server error - check backend running on port 5000');
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
      <div className="card" style={{ width: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '32px', color: 'var(--primary)' }}>CRM Login</h2>
        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '16px', marginBottom: '16px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '16px', marginBottom: '24px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
            required
          />
          <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
        </form>
        <p style={{ marginTop: '24px', fontSize: '14px' }}>
          Demo: admin@CRM.com/admin123 | sales@CRM.com/sales123 | user@CRM.com/user123
        </p>
      </div>
    </div>
  );
}

export default Login;

