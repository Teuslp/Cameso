// backend/routes/dashboard.js (NOVO ARQUIVO)

import express from 'express';
import { getDashboardSummary } from '../controllers/dashboardController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protege a rota do dashboard
router.use(authMiddleware);

// Rota para obter o resumo dos dados
// GET -> /api/dashboard/summary
router.get('/summary', getDashboardSummary);

export default router;