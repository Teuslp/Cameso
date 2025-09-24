import express from 'express';
import { createSubAccount, getSubAccounts } from '../controllers/userManagementController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Todas as rotas aqui exigem que o utilizador esteja autenticado
router.use(authMiddleware);

// Rota para uma conta master buscar as suas sub-contas
router.get('/sub-contas', getSubAccounts);

// Rota para uma conta master criar uma nova sub-conta
router.post('/sub-contas', createSubAccount);

// No futuro, podemos adicionar rotas para atualizar e apagar:
// router.put('/sub-contas/:id', updateSubAccount);
// router.delete('/sub-contas/:id', deleteSubAccount);

export default router;