// backend/routes/agendamento.js (NOVO ARQUIVO)

import express from 'express';
import { createAgendamento, getAgendamentos } from '../controllers/agendamentoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protege todas as rotas de agendamento
router.use(authMiddleware);

// Rota para criar uma nova solicitação de agendamento
// POST -> /api/agendamentos
router.post('/', createAgendamento);

// Rota para listar todos os agendamentos do cliente
// GET -> /api/agendamentos
router.get('/', getAgendamentos);

export default router;