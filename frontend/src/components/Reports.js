import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Reports.css';

const Reports = () => {
    const navigate = useNavigate();

    return (
        <div className="reports-container">
            <div className="sidebar">
                <button onClick={() => navigate('/sales')} className="button-with-icon">
                    <span className="icon">💼</span>
                    <span className="text">Ventas</span>
                </button>
                <button onClick={() => navigate('/products')} className="button-with-icon">
                    <span className="icon">📦</span>
                    <span className="text">Productos</span>
                </button>
                <button onClick={() => navigate('/reports')} className="button-with-icon">
                    <span className="icon">📊</span>
                    <span className="text">Reportes</span>
                </button>
                <img src="/images/logo.png" alt="Logo" className="logo" />
            </div>
            <div className="reports-buttons">
                <h2>Sección de Reportes</h2>
                <button onClick={() => navigate('/reports/sales')} className="button-with-icon">
                    <span className="icon">📝</span>
                    <span className="text">Reportes Ventas</span>
                </button>
                <button onClick={() => navigate('/reports/stock')} className="button-with-icon">
                    <span className="icon">📦</span>
                    <span className="text">Reportes Stock</span>
                </button>
                <button onClick={() => navigate('/reports/transfers')} className="button-with-icon">
                    <span className="icon">💳</span>
                    <span className="text">Reportes Transferencias</span>
                </button>
            </div>
        </div>
    );
};

export default Reports;
