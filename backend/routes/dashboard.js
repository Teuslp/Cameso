// backend/routes/dashboard.js (VERSÃO ATUALIZADA)

import express from 'express';
// 1. Importe a nova função
import { getDashboardSummary, getUpcomingDeadlines } from '../controllers/dashboardController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protege todas as rotas do dashboard
router.use(authMiddleware);

// Rota para obter o resumo dos dados (cards)
// GET -> /api/dashboard/summary
router.get('/summary', getDashboardSummary);

// 2. Adicione a nova rota para obter a lista de vencimentos
// GET -> /api/dashboard/vencimentos
router.get('/vencimentos', getUpcomingDeadlines);

export default router;