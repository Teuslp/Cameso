import mongoose from "mongoose";

const MensagemSchema = new mongoose.Schema({
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  conteudo: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  anexoNome: {
    type: String,
    required: false
  },
  anexoPath: {
    type: String,
    required: false
  }
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
  // --- CAMPO NOVO ADICIONADO CONFORME O PLANO ---
  // Para qual departamento o chamado foi direcionado
  departamento: {
    type: String,
    required: false // É opcional, pois um chamado inicial pode não ter departamento
  },
  // ---------------------------------------------
  clienteId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  mensagens: [MensagemSchema],
  
}, { timestamps: true });

export default mongoose.model("Chamado", ChamadoSchema);

