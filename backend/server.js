// backend/server.js (VERSÃO FINAL DE DEBUG PARA DEPLOY)

import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from 'node-cron';

//rotas 
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import clienteRoutes from "./routes/cliente.js";
// ... (todos os seus outros imports de rotas)
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

// --- LOG DE DIAGNÓSTICO ---
// Este middleware irá imprimir no log da Render toda requisição que chegar.
app.use((req, res, next) => {
  console.log(`[LOG] Recebida requisição: ${req.method} ${req.path} de origem: ${req.headers.origin}`);
  next();
});

// --- CONFIGURAÇÃO DE CORS MAIS ROBUSTA ---
const whitelist = [
    'https://cameso.vercel.app', 
    'https://cameso-qxt3k8h4y-teuslps-projects.vercel.app' // Sua URL de preview da Vercel
];
const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem 'origin' (como Postman ou testes de servidor) OU se a origem estiver na whitelist
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      console.error(`[CORS] Bloqueada a origem: ${origin}`);
      callback(new Error('Não permitido pelo CORS'))
    }
  }
};
app.use(cors(corsOptions));
// --- FIM DA CONFIGURAÇÃO DE CORS ---

app.use(express.json());

// ... (o resto do seu server.js continua igual)
app.use('/uploads', express.static('uploads'));
app.post("/contact", async (req, res) => { /* ... */ });
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
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

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ Erro ao conectar MongoDB:", err));

cron.schedule('0 1 * * *', () => { /* ... */ });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));