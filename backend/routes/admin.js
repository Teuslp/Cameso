// backend/routes/admin.js (VERSÃO ATUALIZADA)

import express from 'express';
import { getClientes, getClienteById, createCliente, updateCliente, deleteCliente } from '../controllers/adminController.js';

// 1. Importe as novas funções de admin do chamadoController
import { 
    getAllChamadosAdmin, 
    getChamadoByIdAdmin, 
    updateChamadoStatus,
    addResposta // A função de resposta agora também é usada pelo admin
} from '../controllers/chamadoController.js';

import {authMiddleware} from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();
router.use(authMiddleware, adminMiddleware); // Protege todas as rotas abaixo

// Rotas de Cliente
router.get('/clientes', getClientes);
router.post('/clientes', createCliente);
router.get('/clientes/:id', getClienteById);
router.put('/clientes/:id', updateCliente);
router.delete('/clientes/:id', deleteCliente);


// --- 2. NOVAS ROTAS PARA GESTÃO DE CHAMADOS ---
router.get('/chamados', getAllChamadosAdmin); // Listar todos os chamados
router.get('/chamados/:id', getChamadoByIdAdmin); // Ver um chamado específico
router.put('/chamados/:id/status', updateChamadoStatus); // Mudar o status
router.post('/chamados/:id/responder', addResposta); // Responder a um chamado


export default router;