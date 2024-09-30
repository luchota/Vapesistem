import React, { useState } from 'react';
import axios from 'axios';
import './styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
            console.log('Login successful', response.data);
            setSuccess(true);
            setError('');
            navigate('/home'); // Redirigir a la página Home
        } catch (error) {
            console.error('Error logging in', error);
            setError('Invalid username or password');
            setSuccess(false);
        }
    };

    return (
        <div className="container">
            <div className="input-container">
                <div className="input-content">
                    <h2>Iniciar Sesión</h2>
                    <div className="input-dist">
                        <input
                            type="text"
                            className="input-is"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <input
                            type="password"
                            className="input-is"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button className="submit-button" onClick={handleLogin}>Iniciar Sesión</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>Inicio Exitoso</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;




