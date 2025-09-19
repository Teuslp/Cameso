// backend/routes/perfil.js (NOVO ARQUIVO)

import express from 'express';
import { getPerfil, updatePerfil } from '../controllers/perfilController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Todas as rotas de perfil exigem que o usuário esteja logado
router.use(authMiddleware);

router.get('/', getPerfil); // Rota para buscar os dados do perfil
router.put('/', updatePerfil); // Rota para atualizar os dados do perfil

export default router;