// backend/controllers/treinamentoController.js (VERSÃO ATUALIZADA)

import Treinamento from '../models/Treinamento.js';

// Listar todos os treinamentos (já existente)
export const getTreinamentos = async (req, res) => {
  try {
    const treinamentos = await Treinamento.find().sort({ nome: 1 });
    res.status(200).json(treinamentos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar treinamentos." });
  }
};

// Criar um novo treinamento
export const createTreinamento = async (req, res) => {
  try {
    const { nome, descricao, validadeEmMeses } = req.body;
    if (!nome || !validadeEmMeses) {
        return res.status(400).json({ message: "Nome e validade são obrigatórios." });
    }
    const novoTreinamento = new Treinamento({ nome, descricao, validadeEmMeses });
    await novoTreinamento.save();
    res.status(201).json(novoTreinamento);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar treinamento." });
  }
};

// Atualizar um treinamento
export const updateTreinamento = async (req, res) => {
  try {
    const { nome, descricao, validadeEmMeses } = req.body;
    const treinamento = await Treinamento.findByIdAndUpdate(
      req.params.id,
      { nome, descricao, validadeEmMeses },
      { new: true }
    );
    if (!treinamento) return res.status(404).json({ message: "Treinamento não encontrado." });
    res.status(200).json(treinamento);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar treinamento." });
  }
};

// Deletar um treinamento
export const deleteTreinamento = async (req, res) => {
  try {
    const treinamento = await Treinamento.findByIdAndDelete(req.params.id);
    if (!treinamento) return res.status(404).json({ message: "Treinamento não encontrado." });
    res.status(200).json({ message: "Treinamento deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar treinamento." });
  }
};