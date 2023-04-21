import { Router } from 'express';
import { login, signup } from '../controllers/usersController.js';

const router = Router();

router.post('', signup);
router.post('', login);

export default router;
