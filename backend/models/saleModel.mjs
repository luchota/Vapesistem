import { query } from '../db.mjs';

// Función para crear una venta
export const createSale = async ({ total, payment_method }) => {
    const [result] = await query('INSERT INTO ventas (total, metodo_pago, fecha_venta) VALUES (?, ?, NOW())', [total, payment_method]);
    return result.insertId; // Devuelve el ID de la venta recién creada
};
