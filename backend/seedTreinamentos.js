// backend/seedTreinamentos.js (NOVO ARQUIVO)

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Treinamento from './models/Treinamento.js'; // Importa nosso Model

// Carrega as variáveis de ambiente (onde está a string de conexão do DB)
dotenv.config();

// Dados dos treinamentos que queremos adicionar
const treinamentosParaAdicionar = [
  {
    nome: 'NR-35 - Trabalho em Altura',
    descricao: 'Capacitação para trabalhos realizados acima de 2 metros do nível inferior.',
    validadeEmMeses: 24,
  },
  {
    nome: 'NR-10 - Segurança em Instalações Elétricas',
    descricao: 'Curso básico de segurança para profissionais que interagem com eletricidade.',
    validadeEmMeses: 24,
  },
  {
    nome: 'NR-33 - Espaços Confinados',
    descricao: 'Treinamento para trabalhadores e vigias em espaços confinados.',
    validadeEmMeses: 12,
  },
  {
    nome: 'CIPA - Comissão Interna de Prevenção de Acidentes',
    descricao: 'Formação para membros da CIPA.',
    validadeEmMeses: 12,
  },
  {
    nome: 'Primeiros Socorros',
    descricao: 'Capacitação para atendimento inicial em situações de emergência.',
    validadeEmMeses: 12,
  }
];

const seedDB = async () => {
  try {
    // Conecta ao banco de dados
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB...');

    // Limpa a coleção para evitar duplicatas se rodarmos o script de novo
    await Treinamento.deleteMany({});
    console.log('Coleção de treinamentos limpa.');

    // Insere os novos dados
    await Treinamento.insertMany(treinamentosParaAdicionar);
    console.log('Catálogo de treinamentos populado com sucesso!');

  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  } finally {
    // Desconecta do banco de dados
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB.');
  }
};

// Executa a função
seedDB();