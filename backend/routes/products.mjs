import { Router } from 'express';
import { query } from '../db.mjs';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await query('SELECT * FROM productos');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

export default router;
