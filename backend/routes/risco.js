// backend/routes/risco.js (NOVO ARQUIVO)
import express from 'express';
import { getRiscos } from '../controllers/riscoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', authMiddleware, getRiscos);
export default router;