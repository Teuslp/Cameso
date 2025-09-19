// backend/controllers/riscoController.js (VERSÃO ATUALIZADA)

import Risco from '../models/Risco.js';

// Listar todos os riscos (já existente)
export const getRiscos = async (req, res) => {
  try {
    const riscos = await Risco.find().sort({ tipo: 1, nome: 1 });
    res.status(200).json(riscos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar riscos." });
  }
};

// Criar um novo risco
export const createRisco = async (req, res) => {
  try {
    const { nome, tipo, descricao } = req.body;
    if (!nome || !tipo) return res.status(400).json({ message: "Nome e tipo são obrigatórios." });

    const novoRisco = new Risco({ nome, tipo, descricao });
    await novoRisco.save();
    res.status(201).json(novoRisco);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar risco." });
  }
};

// Atualizar um risco
export const updateRisco = async (req, res) => {
  try {
    const { nome, tipo, descricao } = req.body;
    const risco = await Risco.findByIdAndUpdate(
      req.params.id,
      { nome, tipo, descricao },
      { new: true }
    );
    if (!risco) return res.status(404).json({ message: "Risco não encontrado." });
    res.status(200).json(risco);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar risco." });
  }
};

// Deletar um risco
export const deleteRisco = async (req, res) => {
  try {
    const risco = await Risco.findByIdAndDelete(req.params.id);
    if (!risco) return res.status(404).json({ message: "Risco não encontrado." });
    res.status(200).json({ message: "Risco deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar risco." });
  }
};