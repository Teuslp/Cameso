// backend/routes/exame.js (VERSÃO ATUALIZADA)

import express from 'express';
import { 
    getExames, 
    createExame, 
    updateExame, 
    deleteExame 
} from '../controllers/exameController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Rota pública para clientes listarem os exames (ex: no formulário de Funções)
router.get('/', authMiddleware, getExames);

// Rotas protegidas para administradores gerenciarem o catálogo
router.post('/', authMiddleware, adminMiddleware, createExame);
router.put('/:id', authMiddleware, adminMiddleware, updateExame);
router.delete('/:id', authMiddleware, adminMiddleware, deleteExame);

export default router;