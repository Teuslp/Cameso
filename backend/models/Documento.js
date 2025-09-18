// backend/models/Documento.js (NOVO ARQUIVO)

import mongoose from "mongoose";
const { Schema } = mongoose;

const DocumentoSchema = new Schema({
  nomeArquivo: { // Nome original do arquivo, ex: "aso_joao_silva.pdf"
    type: String,
    required: true
  },
  path: { // Caminho do arquivo salvo no servidor, ex: "uploads/1663332929-aso_joao_silva.pdf"
    type: String,
    required: true
  },
  tipo: { // Para categorização, ex: ASO, PGR, PCMSO, Certificado NR-35
    type: String,
    required: true
  },
  
  // Vínculo com a empresa cliente
  clienteId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Vínculo com o colaborador (a chave da nossa nova funcionalidade)
  colaboradorId: {
    type: Schema.Types.ObjectId,
    ref: 'Colaborador',
    required: false // Não é obrigatório, pois um documento (ex: PGR) pode ser da empresa toda.
  }

}, { timestamps: true }); // timestamps adiciona createdAt e updatedAt automaticamente

export default mongoose.model("Documento", DocumentoSchema);