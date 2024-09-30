import React, { useState } from 'react';
import axios from 'axios';
import './styles/ReportForm.css';

const StockReport = () => {
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');

    const handleSendReport = async () => {
        try {
            await axios.post('http://localhost:5000/api/reports/stock', { email, celular });
            alert('Reporte de stock enviado con éxito');
            setEmail('');
            setCelular('');
        } catch (error) {
            console.error('Error al enviar el reporte de stock', error);
        }
    };

    return (
        <div className="report-form-container">
            <h2>Enviar Reporte de Stock</h2>
            <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
            />
            <button onClick={handleSendReport}>Enviar Reporte</button>
        </div>
    );
};

export default StockReport;
