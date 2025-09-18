import express from 'express';
// 1. Importe a nova função do controller
import { 
  createColaborador, 
  getColaboradores, 
  updateColaborador, 
  deactivateColaborador,
  getColaboradorById
} from '../controllers/colaboradorController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

// Rotas para a coleção de colaboradores
router.get('/', getColaboradores);
router.post('/', createColaborador);

// 2. ADICIONE A NOVA ROTA DINÂMICA PARA UM ÚNICO COLABORADOR
//    O ':id' captura o ID do colaborador da URL
router.get('/:id', getColaboradorById);

// Rotas para um item específico (update e delete)
router.put('/:id', updateColaborador);
router.delete('/:id', deactivateColaborador);

export default router;