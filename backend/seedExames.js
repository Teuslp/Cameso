// backend/seedExames.js (NOVO ARQUIVO)

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exame from './models/Exame.js';

dotenv.config();

const examesParaAdicionar = [
  { nome: 'Acuidade Visual' },
  { nome: 'Audiometria Tonal e Vocal' },
  { nome: 'Espirometria (Prova de Função Pulmonar)' },
  { nome: 'Raio-X de Tórax' },
  { nome: 'Eletrocardiograma (ECG)' },
  { nome: 'Eletroencefalograma (EEG)' },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB para seed de Exames...');
    await Exame.deleteMany({});
    await Exame.insertMany(examesParaAdicionar);
    console.log('Catálogo de Exames populado com sucesso!');
  } catch (error) {
    console.error('Erro ao popular Exames:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB.');
  }
};

seedDB();