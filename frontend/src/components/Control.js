import React, { useState, useEffect } from 'react';
import './Control.css';
import axios from 'axios';

const Control = () => {
    const [productos, setProductos] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Obtener los productos del backend
        axios.get('http://localhost:5000/api/products')
            .then(response => setProductos(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleUpdateStock = (productId, newStock) => {
        axios.put(`http://localhost:5000/api/products/${productId}`, { stock: newStock })
            .then(response => {
                setProductos(productos.map(product =>
                    product.id === productId ? { ...product, stock: newStock } : product
                ));
            })
            .catch(error => console.error('Error updating product:', error));
    };

    const handleDeleteProduct = (productId) => {
        axios.delete(`http://localhost:5000/api/products/${productId}`)
            .then(response => {
                setProductos(productos.filter(product => product.id !== productId));
            })
            .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <div className="control-container">
            <h2>Control de Stock</h2>
            <input
                type="text"
                placeholder="Buscar por código de barras o nombre"
                value={search}
                onChange={handleSearch}
            />
            <ul className="product-list">
                {productos.filter(product =>
                    product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.barcode.includes(search)
                ).map(product => (
                    <li key={product.id}>
                        <span>{product.name} ({product.barcode}) - Stock: {product.stock}</span>
                        <input
                            type="number"
                            min="0"
                            value={product.stock}
                            onChange={(e) => handleUpdateStock(product.id, e.target.value)}
                        />
                        <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Control;
