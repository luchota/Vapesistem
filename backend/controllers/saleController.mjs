import { createSale as _createSale } from '../models/saleModel.mjs';
import { createSaleDetail } from '../models/saleDetailModel.mjs';
import { createStockHistory } from '../models/stockHistoryModel.mjs';
import { query } from '../db.mjs';

// Función para abrir caja
export const openCashRegister = async (req, res) => {
    const { cashAmount } = req.body;

    // Log para verificar el valor recibido
    console.log('Valor recibido para cashAmount:', cashAmount);

    try {
        // Inserta la apertura de caja en la base de datos
        await query('INSERT INTO caja (monto_inicial, fecha_apertura) VALUES (?, NOW())', [cashAmount]);
        res.json({ message: 'Caja abierta con éxito', cashAmount });
    } catch (error) {
        console.error('Error al abrir la caja:', error);
        res.status(500).json({ error: 'Error al abrir la caja' });
    }
};


// Función para procesar una venta
export const createSale = async (req, res) => {
    const { selectedProducts, total, paymentMethod } = req.body;
    try {
        // Crear el registro de la venta
        const saleId = await _createSale({ total, payment_method: paymentMethod });

        for (const product of selectedProducts) {
            // Crear el detalle de la venta
            await createSaleDetail({ sale_id: saleId, product_id: product.id, quantity: product.quantity });

            // Actualizar el stock y registrar el historial de stock
            await createStockHistory({
                product_id: product.id,
                change_amount: -product.quantity,
                change_type: 'DECREASE',
                change_date: new Date(),
                description: `Venta #${saleId}`
            });
        }

        res.status(201).json({ saleId });
    } catch (error) {
        console.error('Error creating sale:', error);
        res.status(500).json({ error: 'Error creating sale' });
    }
};
