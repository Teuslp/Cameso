// backend/models/Notificacao.js (VERSÃO ATUALIZADA)

import mongoose from "mongoose";
const { Schema } = mongoose;

const NotificacaoSchema = new Schema({
  clienteId: { // Continua sendo quem originou a ação
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paraAdmin: { // <-- CAMPO ADICIONADO
    type: Boolean,
    default: false,
    index: true // Melhora a performance de busca
  },
  mensagem: { type: String, required: true },
  link: { type: String },
  lida: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Notificacao", NotificacaoSchema);