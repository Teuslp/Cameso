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

import { getNotificacoes, marcarTodasComoLidas } from '../controllers/notificacaoController.js';
import upload from '../config/multer.js'; // 1. Importar o nosso middleware de upload

import {authMiddleware} from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();
router.use(authMiddleware, adminMiddleware); 

router.get('/clientes', getClientes);
router.post('/clientes', createCliente);
router.get('/clientes/:id', getClienteById);
router.put('/clientes/:id', updateCliente);
router.delete('/clientes/:id', deleteCliente);


// --- ROTAS PARA GESTÃO DE CHAMADOS ---
router.get('/chamados', getAllChamadosAdmin);
router.get('/chamados/:id', getChamadoByIdAdmin);
router.put('/chamados/:id/status', updateChamadoStatus);

// 2. Adicionar o middleware de upload à rota de resposta do admin.
router.post('/chamados/:id/responder', upload.single('anexo'), addResposta);

// --- ROTAS PARA GESTÃO DE AGENDAMENTOS ---
router.get('/agendamentos', getAllAgendamentosAdmin);
router.put('/agendamentos/:id', updateAgendamentoAdmin);

// --- ROTAS PARA NOTIFICAÇÕES DO ADMIN ---
router.get('/notificacoes', getNotificacoes);
router.post('/notificacoes/marcar-todas-lidas', marcarTodasComoLidas);


export default router;