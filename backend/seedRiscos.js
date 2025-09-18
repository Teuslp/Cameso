// backend/seedRiscos.js (NOVO ARQUIVO)

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Risco from './models/Risco.js';

dotenv.config();

const riscosParaAdicionar = [
  { nome: 'Ruído Contínuo ou Intermitente', tipo: 'Físico' },
  { nome: 'Vibrações de Corpo Inteiro', tipo: 'Físico' },
  { nome: 'Poeiras Minerais (Sílica)', tipo: 'Químico' },
  { nome: 'Produtos Químicos (Geral)', tipo: 'Químico' },
  { nome: 'Levantamento e Transporte Manual de Peso', tipo: 'Ergonômico' },
  { nome: 'Trabalho em Altura', tipo: 'De Acidente' },
  { nome: 'Choque Elétrico', tipo: 'De Acidente' },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB para seed de Riscos...');
    await Risco.deleteMany({});
    await Risco.insertMany(riscosParaAdicionar);
    console.log('Catálogo de Riscos populado com sucesso!');
  } catch (error) {
    console.error('Erro ao popular Riscos:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB.');
  }
};

seedDB();