import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from 'node-cron';
import path from 'path'; // 1. Importar o módulo 'path'
import { fileURLToPath } from 'url'; // Importar para lidar com ES Modules

// Rotas
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import clienteRoutes from './routes/cliente.js';
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

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://cameso.vercel.app',
    'https://cameso-f5l7a51d1-matheuss-projects-b5413000.vercel.app'
  ]
};
app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  if (req.path.endsWith('/') && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    res.redirect(301, req.path.slice(0, -1) + query);
  } else {
    next();
  }
});

// --- CONFIGURAÇÃO PARA SERVIR FICHEIROS ESTÁTICOS ---
// 2. Definir o caminho absoluto para a pasta 'uploads'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// --------------------------------------------------

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cliente", clienteRoutes);
app.use("/api/colaboradores", colaboradorRoutes);
app.use("/api/documentos", documentoRoutes);
app.use("/api/asos", asoRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/agendamentos", agendamentoRoutes);
app.use("/api/treinamentos", treinamentoRoutes); 
app.use("/api/registros-treinamento", registroTreinamentoRoutes);
app.use("/api/chamados", chamadoRoutes);
app.use("/api/funcoes", funcaoRoutes);
app.use("/api/riscos", riscoRoutes);
app.use("/api/exames", exameRoutes);
app.use("/api/notificacoes", notificacaoRoutes);
app.use("/api/perfil", perfilRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ Erro ao conectar MongoDB:", err));

cron.schedule('0 1 * * *', () => {
  console.log('Executando a tarefa agendada de verificação de vencimentos...');
  gerarNotificacoesDeVencimento();
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));

