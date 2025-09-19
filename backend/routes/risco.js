// backend/routes/risco.js (VERSÃO ATUALIZADA)

import express from 'express';
import {
    getRiscos,
    createRisco,
    updateRisco,
    deleteRisco
} from '../controllers/riscoController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Rota pública para clientes listarem os riscos
router.get('/', authMiddleware, getRiscos);

// Rotas protegidas para administradores gerenciarem o catálogo
router.post('/', authMiddleware, adminMiddleware, createRisco);
router.put('/:id', authMiddleware, adminMiddleware, updateRisco);
router.delete('/:id', authMiddleware, adminMiddleware, deleteRisco);

export default router;