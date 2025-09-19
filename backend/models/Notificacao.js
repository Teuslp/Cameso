// backend/models/Notificacao.js (NOVO ARQUIVO)

import mongoose from "mongoose";
const { Schema } = mongoose;

const NotificacaoSchema = new Schema({
  clienteId: { // Para quem é a notificação
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mensagem: { // O texto da notificação. Ex: "O ASO de José Cavalcante vence em 7 dias."
    type: String,
    required: true
  },
  link: { // Link para onde o usuário será levado ao clicar. Ex: "/cliente/colaboradores/..."
    type: String,
  },
  lida: { // Para sabermos se o usuário já visualizou
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("Notificacao", NotificacaoSchema);