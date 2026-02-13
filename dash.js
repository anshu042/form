import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Sample from './components/Sample'; // Import Sample
import Form from './components/Form';     // Import Form
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        
                        {/* DASHBOARD ROUTE:
                           Notice we removed the self-closing "/>" and made it an opening tag ">"
                           so we can nest the child routes inside it.
                        */}
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        >
                            {/* Default: Redirect /dashboard to /dashboard/sample */}
                            <Route index element={<Navigate to="sample" replace />} />
                            
                            {/* Child Routes: Rendered inside the <Outlet /> of Dashboard.js */}
                            <Route path="sample" element={<Sample />} />
                            <Route path="forms" element={<Form />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;






import { Outlet } from 'react-router-dom';

// ... inside the return statement ...
<div className="content">
    <Outlet />  {/* The Sample or Form component will render here */}
</div>







import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
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
                        {/* NavLink automatically knows if it is active.
                           We use a function to set the class: if active, add 'active' class.
                        */}
                        <NavLink 
                            to="/dashboard/sample" 
                            className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
                        >
                            <span className="menu-text">Sample</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink 
                            to="/dashboard/forms" 
                            className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
                        >
                            <span className="menu-text">Forms</span>
                        </NavLink>
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
                    {/* <Outlet /> is the placeholder. 
                       When the URL is /dashboard/sample, <Sample /> renders here.
                       When the URL is /dashboard/forms, <Form /> renders here.
                    */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

