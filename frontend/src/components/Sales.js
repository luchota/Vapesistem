import React from 'react';
import SalesForm from './SalesForm';
import { useNavigate } from 'react-router-dom';
import './styles/Sales.css';

const Sales = () => {
    const navigate = useNavigate();
    return (
        <div className="sales-page-container">
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
            <div className="main-content">
                <SalesForm />
            </div>
        </div>
    );
};

export default Sales;
