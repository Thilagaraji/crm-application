import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Server error - please try again later');
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
      <div className="card" style={{ width: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '32px', color: 'var(--primary)' }}>Create Account</h2>
        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginBottom: '16px' }}>{success}</p>}
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
            style={{ width: '100%', padding: '16px', marginBottom: '16px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: '100%', padding: '16px', marginBottom: '24px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="sales">Sales</option>
          </select>
          <button type="submit" className="btn" style={{ width: '100%', marginBottom: '16px' }}>Register</button>
          
          <div style={{ marginTop: '16px' }}>
            <Link to="/login" style={{ color: '#0B6B6E', textDecoration: 'none' }}>
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
