// backend/models/RegistroTreinamento.js (NOVO ARQUIVO)

import mongoose from "mongoose";
const { Schema } = mongoose;

const RegistroTreinamentoSchema = new Schema({
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
  treinamentoId: { // Vincula ao nosso catálogo de treinamentos
    type: Schema.Types.ObjectId,
    ref: 'Treinamento',
    required: true
  },

  // Dados do Registro
  dataRealizacao: {
    type: Date,
    required: true
  },
  // O CAMPO MAIS IMPORTANTE PARA O DASHBOARD
  dataValidade: {
    type: Date,
    required: true
  },

  // Vínculo opcional ao PDF do certificado
  documentoCertificadoId: {
    type: Schema.Types.ObjectId,
    ref: 'Documento',
    required: false
  }

}, { timestamps: true });

export default mongoose.model("RegistroTreinamento", RegistroTreinamentoSchema);