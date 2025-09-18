// backend/controllers/treinamentoController.js (NOVO ARQUIVO)

import Treinamento from '../models/Treinamento.js';

/**
 * Lista todos os treinamentos disponíveis no catálogo.
 */
export const getTreinamentos = async (req, res) => {
  try {
    const treinamentos = await Treinamento.find().sort({ nome: 1 });
    res.status(200).json(treinamentos);
  } catch (error) {
    console.error("Erro ao listar treinamentos:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
};