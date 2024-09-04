import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.mjs';
import productRoutes from './routes/productRoutes.mjs'; // Rutas para manejar productos
import saleRoutes from './routes/saleRoutes.mjs'; // Rutas para manejar ventas
import reportRoutes from './routes/reportRoutes.mjs'; // Rutas para manejar reportes
import productsRouter from './routes/products.mjs'; // Otra configuración para productos

const app = express();

app.use(cors());
app.use(express.json());

// Montar rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productsRouter); // Cambiado para evitar conflictos con productRoutes
app.use('/api/product-management', productRoutes); // Cambiado para evitar conflictos con productsRouter
app.use('/api/sales', saleRoutes); // Montar saleRoutes en /api/sales
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
