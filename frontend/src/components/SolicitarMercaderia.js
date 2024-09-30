import React, { useState, useEffect } from 'react';
import './styles/SolicitarMercaderia.css';
import axios from 'axios';

const SolicitarMercaderia = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [productoId, setProductoId] = useState('');
    const [cantidad, setCantidad] = useState('');

    useEffect(() => {
        // Obtener la lista de productos del backend
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                console.log('Productos recibidos:', response.data); // Log para verificar si los productos se están cargando
                setProductos(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductos();
    }, []);

    const handleAddSolicitud = () => {
        if (!productoId || !cantidad) {
            alert('Por favor selecciona un producto y especifica una cantidad.');
            return;
        }

        const productoSeleccionado = productos.find(producto => producto.id === parseInt(productoId, 10));
        const nuevaSolicitud = { 
            producto_id: productoId, 
            cantidad: parseInt(cantidad, 10),
            nombre: productoSeleccionado ? productoSeleccionado.nombre : 'Producto no encontrado'
        };

        setSolicitudes([...solicitudes, nuevaSolicitud]);
        setProductoId('');
        setCantidad('');
    };

    const handleEnviarSolicitudes = async () => {
        try {
            await axios.post('http://localhost:5000/api/wholesaler/request', { solicitudes });
            alert('Solicitud enviada con éxito al mayorista');
            setSolicitudes([]);
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
        <div className="solicitar-container">
            <h2>Solicitar Mercadería al Mayorista</h2>
            
            {/* Asegúrate de que los productos están cargados antes de mostrar el select */}
            {productos.length > 0 ? (
                <>
                    <select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
                        <option value="">Selecciona un producto</option>
                        {productos.map((producto) => (
                            <option key={producto.id} value={producto.id}>
                                {producto.nombre} (Stock: {producto.stock})
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        min="1"
                    />
                    <button onClick={handleAddSolicitud}>Agregar a la Solicitud</button>

                    <ul className="request-list">
                        {solicitudes.map((solicitud) => (
                            <li key={solicitud.producto_id}>
                                Producto: {solicitud.nombre} - Cantidad: {solicitud.cantidad}
                            </li>
                        ))}
                    </ul>

                    <button onClick={handleEnviarSolicitudes}>Enviar Solicitud al Mayorista</button>
                </>
            ) : (
                <p>Cargando productos...</p> // Mensaje de carga si no hay productos
            )}
        </div>
    );
};

export default SolicitarMercaderia;
