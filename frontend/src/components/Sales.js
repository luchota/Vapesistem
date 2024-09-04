import React from 'react';
import SalesForm from './SalesForm';
import { useNavigate } from 'react-router-dom';
import './Sales.css';

const Sales = () => {
    const navigate = useNavigate();
    return (
        <div className="sales-page-container">
            <div className="sidebar">
            <button onClick={() => navigate('/sales')}>Ventas</button>
                <button onClick={() => navigate('/products')}>Productos</button>
                <button onClick={() => navigate('/reports')}>Reportes</button>
                {<img src="/images/logo.png" alt="Logo" className="logo" />}
            </div>
            <div className="main-content">
                <SalesForm />
            </div>
        </div>
    );
};

export default Sales;
