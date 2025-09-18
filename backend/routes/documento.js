// backend/routes/documento.js (VERSÃO ATUALIZADA)

import express from 'express';
// 1. Importe a nova função getDocumentos
import { uploadDocumento, getDocumentos } from '../controllers/documentoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import upload from '../config/multer.js';

const router = express.Router();

// Todas as rotas aqui já estão protegidas pelo authMiddleware
router.use(authMiddleware);

// Rota para fazer upload de um novo documento
// POST -> /api/documentos/upload
router.post('/upload', upload.single('documento'), uploadDocumento);

// 2. Nova rota para listar os documentos do cliente
// GET -> /api/documentos
router.get('/', getDocumentos);

export default router;