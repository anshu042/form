import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                id,
                password
            });

            if (response.data.success) {
                navigate('/dashboard');
            } else {
                setError('Invalid ID or Password');
            }
        } catch (err) {
            console.error(err);
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">LOGIN</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="id">ID</label>
                        <input
                            type="text"
                            id="id"
                            placeholder="Enter your ID"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
