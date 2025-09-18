// backend/controllers/riscoController.js (NOVO ARQUIVO)
import Risco from '../models/Risco.js';

export const getRiscos = async (req, res) => {
  try {
    const riscos = await Risco.find().sort({ tipo: 1, nome: 1 });
    res.status(200).json(riscos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar riscos." });
  }
};