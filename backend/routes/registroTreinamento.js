// backend/routes/registroTreinamento.js (NOVO ARQUIVO)
import express from 'express';
import { createRegistro, getRegistros } from '../controllers/registroTreinamentoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware); // Protege todas as rotas abaixo

router.post('/', createRegistro); // Rota para criar um registro
router.get('/', getRegistros); // Rota para listar os registros
export default router;