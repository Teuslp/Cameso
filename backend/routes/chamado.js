import express from 'express';
import { createChamado, getChamados, getChamadoById, addResposta } from '../controllers/chamadoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); // Protege todas as rotas de chamados

router.post('/', createChamado); // Abrir um novo chamado
router.get('/', getChamados); // Listar todos os chamados do cliente
router.get('/:id', getChamadoById); // Ver um chamado específico e suas mensagens
router.post('/:id/responder', addResposta); // Enviar uma nova mensagem em um chamado

export default router;