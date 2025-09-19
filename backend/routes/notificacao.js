// backend/routes/notificacao.js (NOVO ARQUIVO)

import express from 'express';
import { 
  getNotificacoes, 
  marcarComoLida, 
  marcarTodasComoLidas 
} from '../controllers/notificacaoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', getNotificacoes); // Busca todas as notificações
router.patch('/:id/lida', marcarComoLida); // Marca uma como lida
router.post('/marcar-todas-lidas', marcarTodasComoLidas); // Marca todas como lidas

export default router;