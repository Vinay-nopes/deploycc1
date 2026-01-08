import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [creds, setCreds] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (creds.username === 'vinay' && creds.password === 'vin18') {
            onLogin({ name: 'Vinay', role: 'Student' });
        } else {
            setError('Invalid credentials! Try vinay / vin18');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>CampusApp</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Please sign in to continue</p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--danger)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={creds.username}
                            onChange={e => setCreds({ ...creds, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={creds.password}
                            onChange={e => setCreds({ ...creds, password: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
                    >
                        Sign In
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    Demo Credentials: vinay / vin18
                </p>
            </div>
        </div>
    );
};

export default Login;
