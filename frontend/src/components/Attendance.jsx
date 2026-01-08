import React, { useState, useEffect } from 'react';

const Attendance = () => {
    const [data, setData] = useState({ total: 40, attended: 32 });
    const [percentage, setPercentage] = useState(0);
    const [error, setError] = useState(false);
    const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const API_URL = `${BASE_URL}/api/attendance`;

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error('Err');
                const d = await res.json();
                setData(d);
                setError(false);
            } catch (e) { setError(true); }
        };
        load();
    }, []);

    useEffect(() => {
        if (data.total === 0) {
            setPercentage(0);
        } else {
            setPercentage(Math.round((data.attended / data.total) * 100));
        }
    }, [data]);

    const updateBackend = async (newData) => {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });
            if (res.ok) setData(await res.json());
        } catch (e) { alert('Sync failed'); }
    };

    const incrementTotal = () => updateBackend({ total: data.total + 1 });
    const decrementTotal = () => updateBackend({ total: data.total - 1 });
    const incrementAttended = () => updateBackend({ attended: data.attended + 1 });
    const decrementAttended = () => updateBackend({ attended: data.attended - 1 });

    if (error) return (
        <div className="feature-container" style={{ border: '1px solid var(--danger)' }}>
            <h2 style={{ color: 'var(--danger)' }}>📊 Attendance (Offline)</h2>
            <p>⚠️ Service is currently unavailable. Please check your network connection or try again later.</p>
        </div>
    );

    const getColor = () => {
        if (percentage >= 75) return 'var(--success)';
        if (percentage >= 60) return '#facc15'; // yellow
        return 'var(--danger)';
    };

    return (
        <div className="feature-container">
            <div className="feature-header">
                <h2>📊 Attendance Tracker</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>

                {/* Visualization */}
                <div style={{ textAlign: 'center' }}>
                    <div
                        className="attendance-viz"
                        style={{
                            borderColor: getColor(),
                            boxShadow: `0 0 30px ${getColor()}40`
                        }}
                    >
                        <span className="percentage-text" style={{ color: getColor() }}>{percentage}%</span>
                        <span style={{ color: 'var(--text-muted)' }}>Status</span>
                    </div>
                    <p>{percentage >= 75 ? 'Excellent! Keep it up.' : 'Warning: Low Attendance'}</p>
                </div>

                {/* Controls */}
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px' }}>
                    <h3>Update Records</h3>
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Total Classes Held</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={decrementTotal}
                                    style={{ background: 'var(--bg-card)', padding: '0.5rem 1rem', border: '1px solid var(--border)' }}
                                >-</button>
                                <input
                                    type="number"
                                    value={data.total}
                                    readOnly
                                    style={{ margin: 0, textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                                />
                                <button
                                    onClick={incrementTotal}
                                    style={{ background: 'var(--bg-card)', padding: '0.5rem 1rem', border: '1px solid var(--border)' }}
                                >+</button>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Classes Attended</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={decrementAttended}
                                    style={{ background: 'var(--bg-card)', padding: '0.5rem 1rem', border: '1px solid var(--border)' }}
                                >-</button>
                                <input
                                    type="number"
                                    value={data.attended}
                                    readOnly
                                    style={{ margin: 0, textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                                />
                                <button
                                    onClick={incrementAttended}
                                    style={{ background: 'var(--bg-card)', padding: '0.5rem 1rem', border: '1px solid var(--border)' }}
                                >+</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Attendance;
