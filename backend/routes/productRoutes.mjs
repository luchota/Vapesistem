import { Router } from 'express';
const router = Router();
import { createProduct, updateProduct, deleteProduct, getProduct, getProducts } from '../controllers/productController.mjs';

router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/:id', getProduct);
router.get('/products', getProducts);

export default router;
