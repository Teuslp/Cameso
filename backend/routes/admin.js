import express from 'express';
import { getClientes, getClienteById, createCliente, updateCliente, deleteCliente } from '../controllers/adminController.js';

import { 
    getAllChamadosAdmin, 
    getChamadoByIdAdmin, 
    updateChamadoStatus,
    addResposta, 
} from '../controllers/chamadoController.js';

import { 
    getAllAgendamentosAdmin, 
    updateAgendamentoAdmin 
} from '../controllers/agendamentoController.js';

import {authMiddleware} from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();
router.use(authMiddleware, adminMiddleware); 

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

// --- 2. NOVAS ROTAS PARA GESTÃO DE AGENDAMENTOS ---
router.get('/agendamentos', getAllAgendamentosAdmin); // Listar todos os agendamentos
router.put('/agendamentos/:id', updateAgendamentoAdmin); // Confirmar/Atualizar um agendamento


export default router;