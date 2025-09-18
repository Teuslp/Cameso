// backend/server.js (VERSÃO 100% COMPLETA E CORRIGIDA)

import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Torna a pasta 'uploads' publicamente acessível para downloads
app.use('/uploads', express.static('uploads')); 

// Rota de contato (funcionalidade original)
app.post("/contact", async (req, res) => {
  const { name, email, employees, sector, service, message, checklist } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Nova mensagem do site CAMESO",
      html: `
        <h2>Nova mensagem recebida</h2>
        <p><b>Nome:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Setor:</b> ${sector || "Não informado"}</p>
        <p><b>Nº Funcionários:</b> ${employees || "Não informado"}</p>
        <p><b>Serviço de interesse:</b> ${service}</p>
        <p><b>Mensagem:</b><br/>${message}</p>

        <h3>Checklist SST</h3>
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; font-family: Arial; font-size: 14px;">
          <tr><th>Item</th><th>Status</th></tr>
          <tr><td>PCMSO atualizado</td><td>${checklist.pcmso ? "✅ Sim" : "❌ Não"}</td></tr>
          <tr><td>PPRA / PGR atualizado</td><td>${checklist.ppra ? "✅ Sim" : "❌ Não"}</td></tr>
          <tr><td>Funcionários treinados em NR’s</td><td>${checklist.treinamentos ? "✅ Sim" : "❌ Não"}</td></tr>
        </table>
      `,
    });

    res.status(200).json({ message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    res.status(500).json({ error: "Erro ao enviar e-mail." });
  }
});

// Rotas da aplicação do portal
app.use("/auth", authRoutes);
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

// Conexão ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ Erro ao conectar MongoDB:", err));

// Start do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));