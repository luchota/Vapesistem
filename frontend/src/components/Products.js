import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const Products = () => {
    const navigate = useNavigate();

    return (
        <div className="products-container">
            <h2>Sección de Productos</h2>
            <div className="products-buttons">
                <button onClick={() => navigate('/products/control')}>Control</button>
                <button onClick={() => navigate('/products/historial')}>Historial</button>
                <button onClick={() => navigate('/products/solicitar-mercaderia')}>Solicitar Mercadería</button>
            </div>
        </div>
    );
};

export default Products;
