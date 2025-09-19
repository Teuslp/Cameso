import express from "express";
import { login, changePassword } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- ROTAS PÚBLICAS ---
router.post("/login", login);


// --- ROTAS PROTEGIDAS ---
router.post('/change-password', authMiddleware, changePassword);


export default router;