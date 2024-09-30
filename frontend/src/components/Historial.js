import React, { useState, useEffect } from 'react';
import './styles/Historial.css';
import axios from 'axios';

const Historial = () => {
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        // Obtener el historial del backend
        axios.get('http://localhost:5000/api/products/history')
            .then(response => setHistorial(response.data))
            .catch(error => console.error('Error fetching history:', error));
    }, []);

    return (
        <div className="historial-container">
            <h2>Historial de Modificaciones</h2>
            <ul className="history-list">
                {historial.map((entry, index) => (
                    <li key={index}>
                        <span>{entry.date} - {entry.product} - {entry.action}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Historial;
