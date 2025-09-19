// backend/routes/admin.js (VERSÃO CORRIGIDA E COMPLETA)

import express from 'express';
// 1. Importe também a função 'getClienteById'
import { getClientes, getClienteById } from '../controllers/adminController.js'; 
import { authMiddleware } from '../middleware/authMiddleware.js'; 
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Aplica os middlewares para todas as rotas deste arquivo
router.use(authMiddleware, adminMiddleware);


// Rota para listar todos os clientes
router.get('/clientes', getClientes);

// 2. ADICIONE A ROTA QUE FALTAVA para ver os detalhes de um cliente
router.get('/clientes/:id', getClienteById);


export default router;