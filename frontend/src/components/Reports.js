import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Reports.css';

const Reports = () => {
    const navigate = useNavigate();

    return (
        <div className="reports-container">
            <h2>Sección de Reportes</h2>
            <div className="reports-buttons">
                <button onClick={() => navigate('/reports/sales')}>Reportes Ventas</button>
                <button onClick={() => navigate('/reports/stock')}>Reportes Stock</button>
                <button onClick={() => navigate('/reports/transfers')}>Reportes Transferencias</button>
            </div>
        </div>
    );
};

export default Reports;