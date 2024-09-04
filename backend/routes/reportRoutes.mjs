import { Router } from 'express';
import { sendSalesReport, sendStockReport, sendTransferReport } from '../controllers/reportController.mjs';

const router = Router();

router.post('/sales', sendSalesReport);
router.post('/stock', sendStockReport);
router.post('/transfers', sendTransferReport);

export default router;
