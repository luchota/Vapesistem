import { query } from '../db.mjs';

// Función para crear el detalle de una venta
export const createSaleDetail = async ({ sale_id, product_id, quantity }) => {
    await query('INSERT INTO detalle_venta (venta_id, producto_id, cantidad) VALUES (?, ?, ?)', [sale_id, product_id, quantity]);
};
