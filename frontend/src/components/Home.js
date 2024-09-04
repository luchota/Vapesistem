import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="sidebar">
                <button onClick={() => navigate('/sales')}>Ventas</button>
                <button onClick={() => navigate('/products')}>Productos</button>
                <button onClick={() => navigate('/reports')}>Reportes</button>
                <img src="/images/logo.png" alt="Logo" className="logo" />
            </div>
            <div className="content-container">
                <div className="main-content">
                    
                </div>
                <div className="dollar-widget">
                    <iframe
                        title="Cotización del dólar blue"
                        style={{
                            width: '320px',
                            height: '260px',
                            borderRadius: '10px',
                            boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)',
                            border: '1px solid #bcbcbc',
                        }}
                        src="https://dolarhoy.com/i/cotizaciones/dolar-blue"
                        
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Home;
