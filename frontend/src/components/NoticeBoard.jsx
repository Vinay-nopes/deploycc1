import React, { useState, useEffect } from 'react';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: '', date: '', desc: '' });
  const [error, setError] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/notices';

  // Fetch Notices
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Service Down');
      const data = await res.json();
      setNotices(data);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.desc) return;
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotice)
      });
      fetchNotices();
      setNewNotice({ title: '', date: '', desc: '' });
    } catch (err) {
      alert('Failed to post. Service unavailable.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setNotices(notices.filter(n => n.id !== id));
    } catch (err) {
      alert('Delete failed. Service unavailable.');
    }
  };

  if (error) {
    return (
      <div className="feature-container" style={{ border: '1px solid var(--danger)' }}>
        <div className="feature-header">
          <h2 style={{ color: 'var(--danger)' }}>📢 Notice Board (Offline)</h2>
        </div>
        <p>⚠️ Service is currently unavailable. Please check your network connection or try again later.</p>
      </div>
    );
  }

  return (
    <div className="feature-container">
      <div className="feature-header">
        <h2>📢 Notice Board</h2>
        <span className="badge badge-info">{notices.length} Active</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Form */}
        <form onSubmit={handleAdd} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
          <h3>Post New Notice</h3>
          <div style={{ marginTop: '1rem' }}>
            <input
              type="text"
              placeholder="Notice Title"
              value={newNotice.title}
              onChange={e => setNewNotice({ ...newNotice, title: e.target.value })}
            />
            <input
              type="date"
              value={newNotice.date}
              onChange={e => setNewNotice({ ...newNotice, date: e.target.value })}
            />
            <textarea
              rows="3"
              placeholder="Description..."
              value={newNotice.desc}
              onChange={e => setNewNotice({ ...newNotice, desc: e.target.value })}
            />
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Post Notice</button>
          </div>
        </form>

        {/* List */}
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {notices.map(notice => (
            <div key={notice.id} className="list-item">
              <div>
                <h4 style={{ marginBottom: '0.25rem' }}>{notice.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{notice.desc}</p>
                <small style={{ color: 'var(--primary)', marginTop: '0.5rem', display: 'block' }}>📅 {notice.date || 'No Date'}</small>
              </div>
              <button onClick={() => handleDelete(notice.id)} className="btn-danger">Delete</button>
            </div>
          ))}
          {notices.length === 0 && <p style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No notices found.</p>}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
