// backend/controllers/exameController.js (VERSÃO ATUALIZADA)

import Exame from '../models/Exame.js';

// Listar todos os exames (já existente)
export const getExames = async (req, res) => {
  try {
    const exames = await Exame.find().sort({ nome: 1 });
    res.status(200).json(exames);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar exames." });
  }
};

// Criar um novo exame
export const createExame = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    if (!nome) return res.status(400).json({ message: "O nome é obrigatório." });

    const novoExame = new Exame({ nome, descricao });
    await novoExame.save();
    res.status(201).json(novoExame);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar exame." });
  }
};

// Atualizar um exame
export const updateExame = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const exame = await Exame.findByIdAndUpdate(
      req.params.id,
      { nome, descricao },
      { new: true }
    );
    if (!exame) return res.status(404).json({ message: "Exame não encontrado." });
    res.status(200).json(exame);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar exame." });
  }
};

// Deletar um exame
export const deleteExame = async (req, res) => {
  try {
    const exame = await Exame.findByIdAndDelete(req.params.id);
    if (!exame) return res.status(404).json({ message: "Exame não encontrado." });
    res.status(200).json({ message: "Exame deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar exame." });
  }
};