import React, { useState, useEffect } from 'react';

const RoomBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [form, setForm] = useState({ room: '', date: '', time: '' });
    const [error, setError] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/bookings';

    useEffect(() => { fetchBookings(); }, []);

    const fetchBookings = async () => {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Err');
            setBookings(await res.json());
            setError(false);
        } catch (e) { setError(true); }
    };

    const handleBook = async (e) => {
        e.preventDefault();
        if (!form.room || !form.date) return;
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            fetchBookings();
            setForm({ room: '', date: '', time: '' });
        } catch (e) { alert('Service offline'); }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchBookings();
        } catch (e) { }
    };

    if (error) return (
        <div className="feature-container" style={{ border: '1px solid var(--danger)' }}>
            <h2 style={{ color: 'var(--danger)' }}>📅 Room Booking (Offline)</h2>
            <p>Service unavailable. Check `booking-service`.</p>
        </div>
    );

    return (
        <div className="feature-container">
            <div className="feature-header">
                <h2>📅 Room Booking</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                <form onSubmit={handleBook} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
                    <h3>Book a Room</h3>
                    <div style={{ marginTop: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Room Name/Number"
                            value={form.room}
                            onChange={e => setForm({ ...form, room: e.target.value })}
                        />
                        <input
                            type="date"
                            value={form.date}
                            onChange={e => setForm({ ...form, date: e.target.value })}
                        />
                        <input
                            type="time"
                            value={form.time}
                            onChange={e => setForm({ ...form, time: e.target.value })}
                        />
                        <button type="submit" className="btn-primary" style={{ width: '100%' }}>Book Now</button>
                    </div>
                </form>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {bookings.map(b => (
                        <div key={b.id} className="list-item" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '8px', textAlign: 'center', minWidth: '80px' }}>
                                    <div style={{ fontWeight: 'bold' }}>{b.time}</div>
                                </div>
                                <div>
                                    <h4>{b.room}</h4>
                                    <small style={{ color: 'var(--text-muted)' }}>{b.date}</small>
                                </div>
                            </div>
                            <button className="btn-danger" onClick={() => handleDelete(b.id)}>Cancel</button>
                        </div>
                    ))}
                    {bookings.length === 0 && <p style={{ textAlign: 'center', padding: '2rem' }}>No active bookings.</p>}
                </div>
            </div>
        </div>
    );
};

export default RoomBooking;
