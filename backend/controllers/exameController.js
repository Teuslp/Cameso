// backend/controllers/exameController.js (NOVO ARQUIVO)
import Exame from '../models/Exame.js';

export const getExames = async (req, res) => {
  try {
    const exames = await Exame.find().sort({ nome: 1 });
    res.status(200).json(exames);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar exames." });
  }
};