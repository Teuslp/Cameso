import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },

  // --- CAMPOS ATUALIZADOS E NOVOS ---
  tipoConta: { 
    type: String, 
    enum: ["admin_master", "admin_departamento", "cliente_master", "cliente_subconta"], 
    required: true 
  },
  // Para sub-contas, guarda o ID da conta principal (seja ela admin_master ou cliente_master)
  empresaMaeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    default: null
  },
  // Apenas para admin_departamento
  departamento: { 
    type: String,
    required: false
  },
  // Apenas para cliente_subconta, define o que ela pode fazer
  permissoes: {
    type: [String],
    default: []
  },
  // ------------------------------------
  
  // Campos que já existiam
  razaoSocial: { type: String },
  cnpj: { type: String, unique: true, sparse: true },
  ativo: { type: Boolean, default: true } 

}, { timestamps: true });

export default mongoose.model("User", UserSchema);
