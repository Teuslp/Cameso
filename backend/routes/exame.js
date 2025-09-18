// backend/routes/exame.js (NOVO ARQUIVO)
import express from 'express';
import { getExames } from '../controllers/exameController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', authMiddleware, getExames);
export default router;