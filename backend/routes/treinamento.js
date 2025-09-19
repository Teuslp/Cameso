// backend/routes/treinamento.js (VERSÃO ATUALIZADA)

import express from 'express';
import {
    getTreinamentos,
    createTreinamento,
    updateTreinamento,
    deleteTreinamento
} from '../controllers/treinamentoController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Rota pública para clientes listarem os treinamentos
router.get('/', authMiddleware, getTreinamentos);

// Rotas protegidas para administradores gerenciarem o catálogo
router.post('/', authMiddleware, adminMiddleware, createTreinamento);
router.put('/:id', authMiddleware, adminMiddleware, updateTreinamento);
router.delete('/:id', authMiddleware, adminMiddleware, deleteTreinamento);

export default router;