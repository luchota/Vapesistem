import { query } from '../db.mjs';

// Función para registrar el historial de cambios de stock
export const createStockHistory = async ({ product_id, change_amount, change_type, change_date, description }) => {
    await query('INSERT INTO historial_stock (producto_id, cantidad_cambio, tipo_cambio, fecha_cambio, descripcion) VALUES (?, ?, ?, ?, ?)', [product_id, change_amount, change_type, change_date, description]);
};
