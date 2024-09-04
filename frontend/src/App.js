import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Sales from './components/Sales';
import Products from './components/Products';
import Reports from './components/Reports';
import SalesReport from './components/SalesReport';
import StockReport from './components/StockReport';
import TransferReport from './components/TransferReport';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/products" element={<Products />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/sales" element={<SalesReport />} />
                <Route path="/reports/stock" element={<StockReport />} />
                <Route path="/reports/transfers" element={<TransferReport />} />
            </Routes>
        </Router>
    );
};

export default App;
