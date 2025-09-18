// backend/routes/treinamento.js (NOVO ARQUIVO)
import express from 'express';
import { getTreinamentos } from '../controllers/treinamentoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', authMiddleware, getTreinamentos); // Rota para listar o catálogo
export default router;