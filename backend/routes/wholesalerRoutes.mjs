import { Router } from 'express';
const router = Router();
import { solicitarMercaderia } from '../controllers/wholesalerController.mjs';

// Ruta para manejar la solicitud de mercadería
router.post('/request', solicitarMercaderia);

export default router;
