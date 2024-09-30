import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Products.css';

const Products = () => {
    const navigate = useNavigate();

    return (
        <div className="products-container">
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
            <h2>Sección de Productos</h2>
            <div className="products-buttons">
                <button onClick={() => navigate('/products/control')} className="button-with-icon">
                    <span className="icon">⚙️</span>
                    <span className="text">Control</span>
                </button>
                <button onClick={() => navigate('/products/historial')} className="button-with-icon">
                    <span className="icon">📜</span>
                    <span className="text">Historial</span>
                </button>
                <button onClick={() => navigate('/products/solicitar-mercaderia')} className="button-with-icon">
                    <span className="icon">🛒</span>
                    <span className="text">Solicitar</span>
                </button>
            </div>
        </div>
    );
};

export default Products;
