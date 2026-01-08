import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    const [user, setUser] = useState(null);

    return (
        <div>
            {!user ? (
                <Login onLogin={(userData) => setUser(userData)} />
            ) : (
                <ErrorBoundary>
                    <Dashboard user={user} onLogout={() => setUser(null)} />
                </ErrorBoundary>
            )}
        </div>
    );
}

export default App;
