import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ProductManagement = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [codigoBarras, setCodigoBarras] = useState('');
    const [stock, setStock] = useState('');
    const [precio, setPrecio] = useState('');

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProductos(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProductos();
    }, []);

    const handleAddProduct = async () => {
        try {
            const newProduct = { nombre, codigo_barras: codigoBarras, stock, precio };
            const response = await axios.post('http://localhost:5000/api/products', newProduct);
            setProductos([...productos, { ...newProduct, id: response.data.id }]);
            setNombre('');
            setCodigoBarras('');
            setStock('');
            setPrecio('');
        } catch (error) {
            console.error('Error adding product', error);
        }
    };

    return (
        <div className="product-management-container">
            <h2>Gestión de Productos</h2>
            <div className="product-form">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Código de Barras"
                    value={codigoBarras}
                    onChange={(e) => setCodigoBarras(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                <button onClick={handleAddProduct}>Agregar Producto</button>
            </div>
            <ul className="product-list">
                {productos.map((product) => (
                    <li key={product.id}> {/* Asigna una clave única basada en el id del producto */}
                        {product.nombre} ({product.codigo_barras}) - Stock: {product.stock} - Precio: ${product.precio}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;
