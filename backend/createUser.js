import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // ALTERAÇÃO AQUI: de 'bcrypt' para 'bcryptjs'
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB conectado para criação de usuário.");

    const userData = {
      nome: "Cliente de Teste",
      email: "cliente@teste.com",
      senhaPlana: "1234",
      role: "cliente",
    };

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log(`⚠️ Usuário com email ${userData.email} já existe.`);
      mongoose.connection.close();
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(userData.senhaPlana, salt);

    const newUser = new User({
      nome: userData.nome,
      email: userData.email,
      senha: hashedSenha,
      role: userData.role,
    });

    await newUser.save();
    console.log(`✅ Usuário "${newUser.nome}" criado com sucesso!`);

  } catch (error) {
    console.error("❌ Erro ao criar usuário:", error);
  } finally {
    mongoose.connection.close();
    console.log("🔌 Conexão com MongoDB fechada.");
  }
};

createUser();