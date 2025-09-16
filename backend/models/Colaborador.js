// backend/models/Colaborador.js (NOVO ARQUIVO)

import mongoose from "mongoose";
const { Schema } = mongoose;

const ColaboradorSchema = new Schema({
  nomeCompleto: { 
    type: String, 
    required: true 
  },
  cpf: { 
    type: String, 
    required: true, 
    unique: true // Garante que não haverá dois CPFs iguais em todo o sistema
  },
  funcao: { 
    type: String, 
    required: true 
  },
  dataAdmissao: { 
    type: Date, 
    required: true 
  },
  ativo: { 
    type: Boolean, 
    default: true // Útil para "desativar" um funcionário demitido sem apagar o histórico
  },

  /**
   * Este é o campo mais importante.
   * Ele cria o vínculo entre este colaborador e a empresa cliente (que está no model 'User').
   * Todo colaborador pertencerá a um cliente específico.
   */
  clienteId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // A 'ref' diz ao Mongoose para procurar na coleção 'User'
    required: true
  }
  
}, { timestamps: true });

export default mongoose.model("Colaborador", ColaboradorSchema);