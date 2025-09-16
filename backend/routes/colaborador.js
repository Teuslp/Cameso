// backend/routes/colaborador.js (VERSÃO COMPLETA E ATUALIZADA)

import express from 'express';

// Importa todas as funções necessárias do controller
import { 
  createColaborador, 
  getColaboradores, 
  updateColaborador,
  deactivateColaborador
} from '../controllers/colaboradorController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Aplica o middleware de autenticação a TODAS as rotas deste arquivo.
// Nenhuma operação com colaboradores poderá ser feita sem um token válido.
router.use(authMiddleware);

// --- DEFINIÇÃO DAS ROTAS ---

// Rota para LISTAR os colaboradores do cliente logado
// GET -> /api/colaboradores/
router.get('/', getColaboradores);

// Rota para CRIAR um novo colaborador
// POST -> /api/colaboradores/
router.post('/', createColaborador);

// Rota para ATUALIZAR um colaborador existente
// O ':id' na URL captura o ID do colaborador que será editado
// PUT -> /api/colaboradores/60d21b4667d0d8992e610c85 (exemplo)
router.put('/:id', updateColaborador);

// DELETE -> /api/colaboradores/:id
router.delete('/:id', deactivateColaborador);


export default router;