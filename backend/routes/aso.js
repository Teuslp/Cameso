// backend/routes/aso.js (NOVO ARQUIVO)

import express from 'express';
import { createAso, getAsos } from '../controllers/asoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protege todas as rotas de ASO
router.use(authMiddleware);

// Rota para criar um novo registro de ASO
// POST -> /api/asos
router.post('/', createAso);

// Rota para listar todos os ASOs do cliente
// GET -> /api/asos
router.get('/', getAsos);

export default router;