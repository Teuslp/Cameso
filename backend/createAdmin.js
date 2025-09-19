// backend/createAdmin.js (NOVO ARQUIVO)

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js'; // Importa nosso Model de Usuário

dotenv.config();

// --- ❗ IMPORTANTE: PREENCHA SEUS DADOS AQUI ---
const adminData = {
  nome: "Administrador",
  email: "admin@cameso.com.br",
  senha: "1234", // Escolha uma senha forte
  razaoSocial: "Cameso", // Opcional, para o admin
  cnpj: "00.000.000/0001-00" // Opcional, para o admin
};
// -----------------------------------------

const createAdminAccount = async () => {
  try {
    // 1. Conecta ao banco de dados
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado ao MongoDB...");

    // 2. Verifica se o admin já existe
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("⚠️ Um usuário com este email já existe.");
      await mongoose.disconnect();
      return;
    }

    // 3. Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.senha, salt);
    console.log("🔑 Senha criptografada.");

    // 4. Cria o novo usuário com a role de 'admin'
    const adminUser = new User({
      nome: adminData.nome,
      email: adminData.email,
      razaoSocial: adminData.razaoSocial,
      cnpj: adminData.cnpj,
      senha: hashedPassword,
      role: 'admin', // A parte mais importante!
    });

    // 5. Salva no banco de dados
    await adminUser.save();
    console.log("✅ Usuário administrador criado com sucesso!");

  } catch (error) {
    console.error("❌ Erro ao criar administrador:", error);
  } finally {
    // 6. Desconecta do banco de dados
    await mongoose.disconnect();
    console.log("🔌 Desconectado do MongoDB.");
  }
};

// Executa a função
createAdminAccount();