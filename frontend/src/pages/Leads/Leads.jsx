import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../App.css';

function Leads() {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({ name: '', email: '', phone: '', source: 'Website' });
  const [loading, setLoading] = useState(false);
  const { role } = useAuth();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };

  const addLead = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newLead)
      });
      if (res.ok) {
        const data = await res.json();
        setLeads([data, ...leads]);
        setNewLead({ name: '', email: '', phone: '', source: 'Website' });
      }
    } catch (err) {
      console.error('Error adding lead:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!['admin', 'sales'].includes(role)) {
    return <div className="container"><h2>Access Denied</h2></div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2>Lead Tracking</h2>
        <Link to="/" className="btn">← Back to Dashboard</Link>
      </div>

      <div className="card">
        <h3>Add New Lead</h3>
        <form onSubmit={addLead} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <input
            type="text"
            placeholder="Name"
            value={newLead.name}
            onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newLead.email}
            onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newLead.phone}
            onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
          />
          <select
            value={newLead.source}
            onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
          >
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Email">Email</option>
            <option value="Social">Social</option>
          </select>
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Adding...' : 'Add Lead'}
          </button>
        </form>
      </div>

      <div className="card">
        <h3>Recent Leads ({leads.length})</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--primary)', color: 'white' }}>
                <th style={{ padding: '16px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Phone</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Source</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '16px' }}>{lead.name}</td>
                  <td style={{ padding: '16px' }}>{lead.email}</td>
                  <td style={{ padding: '16px' }}>{lead.phone}</td>
                  <td style={{ padding: '16px' }}><span style={{ background: 'var(--light-green)', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>{lead.source}</span></td>
                  <td style={{ padding: '16px' }}><span style={{ background: 'var(--success)', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>{lead.status}</span></td>
                  <td style={{ padding: '16px' }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leads;

