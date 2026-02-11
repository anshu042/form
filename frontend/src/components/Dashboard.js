import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <div className="logo">Dashboard</div>
                </div>

                <ul className="sidebar-menu">
                    <li className="menu-item">
                        <a href="#sample" className="menu-link active">
                            <span className="menu-text">Sample</span>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="#forms" className="menu-link">
                            <span className="menu-text">Forms</span>
                        </a>
                    </li>
                </ul>

                <div className="logout-container">
                    <button className="logout-btn" onClick={handleLogout}>
                        <span className="logout-text">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className={`header ${isSidebarOpen ? 'dashboard-header-open' : ''}`}>
                    <button className="dashboard-toggle-btn" onClick={toggleSidebar}>
                        <span className="toggle-icon">{isSidebarOpen ? '❮' : '❯'}</span>
                        Dashboard
                    </button>
                </div>
                <div className="content">
                    <p>Welcome to your dashboard!</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
