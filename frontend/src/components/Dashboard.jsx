import React, { useState } from 'react';
import NoticeBoard from './NoticeBoard';
import Complaints from './Complaints';
import RoomBooking from './RoomBooking';
import Attendance from './Attendance';

const Dashboard = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('notices');

    const renderContent = () => {
        switch (activeTab) {
            case 'notices': return <NoticeBoard />;
            case 'complaints': return <Complaints />;
            case 'rooms': return <RoomBooking />;
            case 'attendance': return <Attendance />;
            default: return <NoticeBoard />;
        }
    };

    return (
        <div className="container">
            <header className="dashboard-header">
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Smart Campus</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user.name}</p>
                </div>
                <button onClick={onLogout} className="btn-danger">Logout</button>
            </header>

            {/* Navigation Cards */}
            <div className="nav-grid">
                <div
                    className={`nav-card ${activeTab === 'notices' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notices')}
                >
                    <span className="nav-icon">📢</span>
                    <h3>Notices</h3>
                </div>
                <div
                    className={`nav-card ${activeTab === 'complaints' ? 'active' : ''}`}
                    onClick={() => setActiveTab('complaints')}
                >
                    <span className="nav-icon">⚠️</span>
                    <h3>Complaints</h3>
                </div>
                <div
                    className={`nav-card ${activeTab === 'rooms' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rooms')}
                >
                    <span className="nav-icon">📅</span>
                    <h3>Bookings</h3>
                </div>
                <div
                    className={`nav-card ${activeTab === 'attendance' ? 'active' : ''}`}
                    onClick={() => setActiveTab('attendance')}
                >
                    <span className="nav-icon">📊</span>
                    <h3>Attendance</h3>
                </div>
            </div>

            {/* Main Content Area */}
            {renderContent()}
        </div>
    );
};

export default Dashboard;
