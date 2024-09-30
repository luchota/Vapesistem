import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/SalesForm.css';

const SalesForm = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [cashAmount, setCashAmount] = useState(0); // Inicializar en 0
    const [paymentMethod, setPaymentMethod] = useState('EFECTIVO');
    const [isCashRegisterOpen, setIsCashRegisterOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error al cargar los productos', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCashAmountChange = (e) => {
        setCashAmount(e.target.value);
    };

    const handleAddProduct = (product) => {
        setSelectedProducts((prevSelectedProducts) => {
            const existingProduct = prevSelectedProducts.find(p => p.id === product.id);
            if (existingProduct) {
                return prevSelectedProducts.map(p =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prevSelectedProducts, { ...product, quantity: 1 }];
        });
        calculateTotal();
    };

    const handleQuantityChange = (product, quantity) => {
        setSelectedProducts((prevSelectedProducts) =>
            prevSelectedProducts.map(p =>
                p.id === product.id ? { ...p, quantity } : p
            )
        );
        calculateTotal();
    };

    const handleRemoveProduct = (productId) => {
        setSelectedProducts((prevSelectedProducts) =>
            prevSelectedProducts.filter(p => p.id !== productId)
        );
        calculateTotal();
    };

    const calculateTotal = () => {
        const total = selectedProducts.reduce((acc, product) => acc + product.quantity * product.precio, 0);
        setTotal(total);
    };

    const handleOpenCashRegister = async () => {
        try {
            console.log('Enviando cashAmount:', cashAmount); // Log para verificar lo que se envía
            const response = await axios.post('http://localhost:5000/api/sales/open-cash-register', { cashAmount });
            setIsCashRegisterOpen(true); // Si la solicitud es exitosa, abre la caja
            alert(response.data.message);
        } catch (error) {
            console.error('Error al abrir la caja:', error);
            alert('Error al abrir la caja');
        }
    };
    

    const handleCheckout = async () => {
        if (!isCashRegisterOpen) {
            alert('Debe abrir la caja antes de realizar una venta.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/sales/checkout', {
                selectedProducts,
                total,
                paymentMethod
            });
            alert('Venta realizada con éxito');
            setSelectedProducts([]); // Limpiar la lista de productos seleccionados
            setTotal(0); // Reiniciar el total
        } catch (error) {
            console.error('Error al realizar la venta', error);
            alert('Error al realizar la venta');
        }
    };

    const filteredProducts = products.filter(product =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.codigo_barras.includes(searchTerm)
    );

    return (
        <div className="sales-form-container">
            {/* Apertura de caja */}
            <div className="cash-register-section">
                <h2>Iniciar Caja</h2>
                <input
                    type="number"
                    placeholder="Cantidad de Efectivo"
                    value={cashAmount}
                    onChange={handleCashAmountChange}
                    disabled={isCashRegisterOpen}
                />
                <button onClick={handleOpenCashRegister} disabled={isCashRegisterOpen}>Abrir Caja</button>
            </div>
    
            {/* Facturador (solo visible si la caja está abierta) */}
            {isCashRegisterOpen && (
                <div className="invoicing-section">
                    <h2>Facturador</h2>
                    <input
                        type="text"
                        placeholder="Buscar producto por nombre o código de barras"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                    />
                <div className="products-container">
                        {searchTerm && filteredProducts.length > 0 && (
                            filteredProducts.map(product => (
                                <div key={product.id} className="product-item">
                                    <span>{product.nombre}</span>
                                    <button onClick={() => handleAddProduct(product)}>Añadir</button>
                                </div>
                            ))
                        )}

                        {searchTerm && filteredProducts.length === 0 && (
                            <p>No se encontraron productos</p>
                        )}

                        {!searchTerm && (
                            <p>Busca un producto por nombre o código de barras</p>
                        )}
                    </div>

                    <h2>Productos Seleccionados</h2>
                    <div className="selected-products-container">
                        {selectedProducts.map(product => (
                            <div key={product.id} className="selected-product-item">
                                <span>{product.nombre}</span>
                                <input
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) => handleQuantityChange(product, parseInt(e.target.value))}
                                />
                                <button onClick={() => handleRemoveProduct(product.id)}>Eliminar</button>
                            </div>
                        ))}
                    </div>
    
                    <h2>Total: {total.toFixed(2)}</h2>
                    <div className="payment-methods">
                        <label>
                            <input type="radio" value="EFECTIVO" checked={paymentMethod === 'EFECTIVO'} onChange={(e) => setPaymentMethod(e.target.value)} /> Efectivo
                        </label>
                        <label>
                            <input type="radio" value="TARJETA" checked={paymentMethod === 'TARJETA'} onChange={(e) => setPaymentMethod(e.target.value)} /> Tarjeta
                        </label>
                        <label>
                            <input type="radio" value="EFECTIVO/TARJETA" checked={paymentMethod === 'EFECTIVO/TARJETA'} onChange={(e) => setPaymentMethod(e.target.value)} /> Efectivo/Tarjeta
                        </label>
                    </div>
                    <button onClick={handleCheckout}>FACTURAR</button>
                </div>
            )}
        </div>
    );
}    

export default SalesForm;
