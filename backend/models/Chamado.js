import mongoose from "mongoose";

const MensagemSchema = new mongoose.Schema({
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Quem enviou
  conteudo: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChamadoSchema = new mongoose.Schema({
  assunto: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Aberto', 'Em Andamento', 'Fechado'],
    default: 'Aberto',
  },
  prioridade: {
    type: String,
    enum: ['Baixa', 'Normal', 'Alta'],
    default: 'Normal',
  },
  clienteId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  mensagens: [MensagemSchema],
  
}, { timestamps: true });

export default mongoose.model("Chamado", ChamadoSchema);