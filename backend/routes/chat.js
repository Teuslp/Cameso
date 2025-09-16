import express from "express";
// A importação do middleware ainda é necessária para as outras rotas
import { authMiddleware } from "../middleware/authMiddleware.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

const router = express.Router();

// Rota de teste (pode remover depois)
router.get("/test", (req, res) => {
  console.log("!!! A ROTA DE TESTE /chat/test FOI ACEDIDA !!!");
  res.send("A rota de teste do chat funciona!");
});

// ======================================================
// Rota para criar ou obter uma conversa, SEM O MIDDLEWARE PARA TESTE
router.post("/create", async (req, res) => {
// ======================================================
  try {
    // Como removemos o middleware, `req.user` não existe.
    // Isto vai causar um erro 500, e é isso que queremos ver.
    const adminUser = await User.findOne({ role: "admin" });
    if (!adminUser) {
      return res.status(404).json({ message: "Administrador não encontrado." });
    }

    const participantIds = [req.user.id, adminUser._id]; // Esta linha vai dar erro

    let chat = await Chat.findOne({
      participants: { $all: participantIds, $size: participantIds.length },
    });

    if (!chat) {
      chat = new Chat({ participants: participantIds });
      await chat.save();
    }

    res.status(201).json(chat);
  } catch (err) {
    // Nós esperamos que um erro aconteça e seja capturado aqui
    console.error("ERRO ESPERADO DENTRO DA ROTA /create:", err.message);
    res.status(500).json({ message: "Erro ao criar conversa (ERRO DE TESTE)", error: err.message });
  }
});


// As outras rotas continuam com o middleware
router.get("/", authMiddleware, async (req, res) => {
    //... seu código
});
router.get("/:chatId", authMiddleware, async (req, res) => {
    //... seu código
});
router.post("/:chatId/message", authMiddleware, async (req, res) => {
    //... seu código
});

export default router;