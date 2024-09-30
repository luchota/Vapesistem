import React, { useState, useEffect } from 'react';
import './styles/Control.css';
import axios from 'axios';

const Control = () => {
    const [productos, setProductos] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Obtener los productos del backend
        axios.get('http://localhost:5000/api/products')
            .then(response => {
                console.log('Productos recibidos:', response.data);
                setProductos(response.data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // Función para actualizar el stock de un producto
    const handleUpdateStock = (productId, newStock) => {
        axios.put(`http://localhost:5000/api/product-management/products/${productId}`, { stock: newStock })
            .then(response => {
                setProductos(productos.map(product =>
                    product.id === productId ? { ...product, stock: newStock } : product
                ));
                alert('Stock actualizado correctamente');
            })
            .catch(error => console.error('Error updating product:', error));
    };
    
    // Para manejar el nuevo valor de stock
    const [updatedStock, setUpdatedStock] = useState({});
    
    const handleStockChange = (productId, newStock) => {
        setUpdatedStock({
            ...updatedStock,
            [productId]: newStock
        });
    };
    

    // Función para eliminar un producto
    const handleDeleteProduct = (productId) => {
        console.log('Deleting product with ID:', productId);
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (confirmed) {
            axios.delete(`http://localhost:5000/api/products/${productId}`)
                .then(response => {
                    setProductos(productos.filter(product => product.id !== productId));
                    alert('Producto eliminado correctamente');
                })
                .catch(error => console.error('Error deleting product:', error));
        }
    };
    

    // Filtrar productos
    const filteredProducts = productos.filter(product => {
        const productName = product.nombre ? product.nombre.toLowerCase() : '';
        const productBarcode = product.codigo_barras ? product.codigo_barras : '';

        return productName.includes(search.toLowerCase()) || productBarcode.includes(search);
    });

    return (
        
        <div className="control-container">
            <h2>Control de Stock</h2>
            <input
                type="text"
                placeholder="Buscar por código de barras o nombre"
                value={search}
                onChange={handleSearch}
            />
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Código de Barras</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Actualizar Stock</th> {/* Este es un encabezado informativo */}
                        <th>Eliminar Producto</th> {/* Este también */}
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.nombre}</td>
                            <td>{product.codigo_barras}</td>
                            <td>{product.stock}</td>
                            <td>{product.precio}</td>
                            <td>
                                {/* Input para actualizar el stock */}
                                <input
                                type="number"
                                min="0"
                                value={updatedStock[product.id] || product.stock} // Usamos el valor de updatedStock si existe
                                onChange={(e) => handleStockChange(product.id, e.target.value)}
                            />
                            <button onClick={() => handleUpdateStock(product.id, updatedStock[product.id] || product.stock)}>
                                Actualizar
                            </button>
                            </td>
                            <td>
                                {/* Botón para eliminar el producto */}
                                <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="6">No se encontraron productos</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Control;
