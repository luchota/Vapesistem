import { Router } from 'express';
const router = Router();
import { handleCreateUser } from '../controllers/userController.mjs';
import { loginUser } from '../controllers/authController.mjs';

router.post('/users', handleCreateUser);
router.post('/login', loginUser);
// Otras rutas CRUD para usuarios...

export default router;
