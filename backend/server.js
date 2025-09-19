// backend/server.js (VERSÃO CORRIGIDA)

import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from 'node-cron';

// Imports das rotas da nossa aplicação
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import clienteRoutes from "./routes/cliente.js";
import colaboradorRoutes from './routes/colaborador.js';
import documentoRoutes from './routes/documento.js';
import asoRoutes from './routes/aso.js';
import dashboardRoutes from './routes/dashboard.js';
import agendamentoRoutes from './routes/agendamento.js';
import treinamentoRoutes from './routes/treinamento.js';
import registroTreinamentoRoutes from './routes/registroTreinamento.js';
import chamadoRoutes from './routes/chamado.js';
import funcaoRoutes from './routes/funcao.js';
import riscoRoutes from './routes/risco.js';
import exameRoutes from './routes/exame.js';
import gerarNotificacoesDeVencimento from './workers/notificationWorker.js';
import notificacaoRoutes from './routes/notificacao.js';
import perfilRoutes from './routes/perfil.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Torna a pasta 'uploads' publicamente acessível para downloads
app.use('/uploads', express.static('uploads')); 

// Rota de contato (funcionalidade original)
app.post("/contact", async (req, res) => {
  // ... seu código de envio de e-mail ...
});

// Rotas da aplicação do portal
app.use("/api/auth", authRoutes); // <-- CORREÇÃO APLICADA AQUI
app.use("/admin", adminRoutes);
app.use("/cliente", clienteRoutes);
app.use('/api/colaboradores', colaboradorRoutes);
app.use('/api/documentos', documentoRoutes);
app.use('/api/asos', asoRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/agendamentos', agendamentoRoutes);
app.use('/api/treinamentos', treinamentoRoutes); 
app.use('/api/registros-treinamento', registroTreinamentoRoutes);
app.use('/api/chamados', chamadoRoutes);
app.use('/api/funcoes', funcaoRoutes);
app.use('/api/riscos', riscoRoutes);
app.use('/api/exames', exameRoutes);
app.use('/api/notificacoes', notificacaoRoutes);
app.use('/api/perfil', perfilRoutes);

// Conexão ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ Erro ao conectar MongoDB:", err));

// Agenda a tarefa para rodar todo dia à 1 da manhã
cron.schedule('0 1 * * *', () => {
  console.log('Executando a tarefa agendada de verificação de vencimentos...');
  gerarNotificacoesDeVencimento();
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

// Start do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));