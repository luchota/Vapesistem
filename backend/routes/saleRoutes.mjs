import { Router } from 'express';
import { createSale, openCashRegister } from '../controllers/saleController.mjs';

const router = Router();

// Ruta para abrir caja
router.post('/open-cash-register', openCashRegister);

// Ruta para procesar una venta
router.post('/checkout', createSale);

// Otras rutas CRUD para ventas...

export default router;
