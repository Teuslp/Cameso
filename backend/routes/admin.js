// backend/routes/admin.js (VERSÃO COMPLETA)

import express from 'express';
// 1. Importe as novas funções
import { 
    getClientes, 
    getClienteById, 
    createCliente,
    updateCliente,
    deleteCliente
} from '../controllers/adminController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

// Rotas de Cliente
router.get('/clientes', getClientes); // Listar
router.post('/clientes', createCliente); // Criar
router.get('/clientes/:id', getClienteById); // Obter por ID
router.put('/clientes/:id', updateCliente); // 2. Rota de ATUALIZAÇÃO
router.delete('/clientes/:id', deleteCliente); // 3. Rota de DELEÇÃO (desativação)

export default router;