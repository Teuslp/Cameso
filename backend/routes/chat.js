import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

const router = express.Router();

// Criar nova conversa (Admin ou Cliente)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { participantIds } = req.body;
    const newChat = new Chat({ participants: participantIds });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar conversa", error: err.message });
  }
});

// Buscar conversas do usuário logado
router.get("/", authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user.id })
      .populate("participants", "nome role")
      .populate({
        path: "messages.sender",
        select: "nome role"
      });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar conversas", error: err.message });
  }
});

// Enviar mensagem
router.post("/:chatId/message", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) return res.status(404).json({ message: "Conversa não encontrada" });

    const message = { sender: req.user.id, content };
    chat.messages.push(message);
    await chat.save();

    // Popula sender para frontend
    await chat.populate({
      path: "messages.sender",
      select: "nome role"
    });

    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: "Erro ao enviar mensagem", error: err.message });
  }
});

export default router;
