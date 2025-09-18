// backend/routes/funcao.js (NOVO ARQUIVO)

import express from 'express';
import {
  createFuncao,
  getFuncoes,
  getFuncaoById,
  updateFuncao,
  deleteFuncao
} from '../controllers/funcaoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware);

router.post('/', createFuncao);          // Criar
router.get('/', getFuncoes);            // Listar
router.get('/:id', getFuncaoById);        // Obter por ID
router.put('/:id', updateFuncao);         // Atualizar
router.delete('/:id', deleteFuncao);      // Deletar

export default router;