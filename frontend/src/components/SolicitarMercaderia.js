import React, { useState } from 'react';
import './SolicitarMercaderia.css';
import axios from 'axios';

const SolicitarMercaderia = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [productoId, setProductoId] = useState('');
    const [cantidad, setCantidad] = useState('');

    const handleAddSolicitud = () => {
        const nuevaSolicitud = { producto_id: productoId, cantidad: parseInt(cantidad, 10) };
        setSolicitudes([...solicitudes, nuevaSolicitud]);
        setProductoId('');
        setCantidad('');
    };

    const handleEnviarSolicitudes = async () => {
        try {
            await axios.post('http://localhost:5000/api/products/request', { solicitudes });
            alert('Solicitud enviada con éxito');
            setSolicitudes([]);
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
        <div className="solicitar-container">
            <h2>Solicitar Mercadería</h2>
            <input
                type="text"
                placeholder="ID del Producto"
                value={productoId}
                onChange={(e) => setProductoId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
            />
            <button onClick={handleAddSolicitud}>Agregar a la Solicitud</button>
            <ul className="request-list">
                {solicitudes.map((solicitud) => (
                    <li key={solicitud.producto_id}>
                        Producto ID: {solicitud.producto_id} - Cantidad: {solicitud.cantidad}
                    </li>
                ))}
            </ul>
            <button onClick={handleEnviarSolicitudes}>Enviar Solicitud</button>
        </div>
    );
};

export default SolicitarMercaderia;
