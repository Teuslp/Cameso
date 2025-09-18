// backend/models/Agendamento.js (NOVO ARQUIVO)

import mongoose from "mongoose";
const { Schema } = mongoose;

const AgendamentoSchema = new Schema({
  // Vínculos
  clienteId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  colaboradorId: {
    type: Schema.Types.ObjectId,
    ref: 'Colaborador',
    required: true
  },

  // Dados da Solicitação (preenchidos pelo cliente)
  tipoExame: {
    type: String,
    enum: ['Admissional', 'Periódico', 'Demissional', 'Retorno ao Trabalho', 'Mudança de Risco'],
    required: true
  },
  dataSugerida: {
    type: Date,
    required: true
  },
  observacoes: { // Campo para o cliente adicionar notas
    type: String
  },

  // Dados do Workflow (controlados pelo sistema e pelo ADM)
  status: {
    type: String,
    enum: ['Solicitado', 'Confirmado', 'Cancelado', 'Realizado'],
    default: 'Solicitado',
    required: true
  },
  
  // Dados da Confirmação (preenchidos pelo ADM da Cameso)
  dataConfirmada: {
    type: Date
  },
  localConfirmado: {
    type: String
  },
  instrucoes: { // Campo para o ADM adicionar instruções (ex: "chegar 15 min antes")
      type: String
  }

}, { timestamps: true });

export default mongoose.model("Agendamento", AgendamentoSchema);