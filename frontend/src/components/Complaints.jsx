import React, { useState, useEffect } from 'react';

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [form, setForm] = useState({ category: 'Maintenance', desc: '' });
    const [error, setError] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/complaints';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Service Down');
            const data = await res.json();
            setComplaints(data);
            setError(false);
        } catch (err) {
            setError(true);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!form.desc) return;
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            fetchData();
            setForm({ ...form, desc: '' });
        } catch (err) {
            alert('Service unavailable');
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            setComplaints(complaints.filter(x => x.id !== id));
        } catch (err) {
            alert('Service unavailable');
        }
    };

    if (error) {
        return (
            <div className="feature-container" style={{ border: '1px solid var(--danger)' }}>
                <h2 style={{ color: 'var(--danger)' }}>⚠️ Complaints (Offline)</h2>
                <p>⚠️ Service is currently unavailable. Please check your network connection or try again later.</p>
            </div>
        );
    }

    return (
        <div className="feature-container">
            <div className="feature-header">
                <h2>⚠️ Complaints Portal</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                <form onSubmit={handleAdd} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
                    <h3>File Complaint</h3>
                    <div style={{ marginTop: '1rem' }}>
                        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                            <option value="Maintenance">Maintenance</option>
                            <option value="IT Support">IT Support</option>
                            <option value="Cafeteria">Cafeteria</option>
                            <option value="Other">Other</option>
                        </select>
                        <textarea
                            rows="4"
                            placeholder="Describe the issue..."
                            value={form.desc}
                            onChange={e => setForm({ ...form, desc: e.target.value })}
                        />
                        <button type="submit" className="btn-primary" style={{ width: '100%' }}>Submit Complaint</button>
                    </div>
                </form>

                <div>
                    {complaints.map(c => (
                        <div key={c.id} className="list-item">
                            <div>
                                <span className={`badge ${c.category === 'IT Support' ? 'badge-info' : 'badge-warning'}`} style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                                    {c.category}
                                </span>
                                <p>{c.desc}</p>
                            </div>
                            <button className="btn-danger" onClick={() => handleDelete(c.id)}>Resolve</button>
                        </div>
                    ))}
                    {complaints.length === 0 && <p style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>All clear! No complaints.</p>}
                </div>
            </div>
        </div>
    );
};

export default Complaints;
