// backend/controllers/funcaoController.js (NOVO ARQUIVO)

import Funcao from '../models/Funcao.js';

// Criar uma nova Função
export const createFuncao = async (req, res) => {
  try {
    const { nome, descricao, riscos, examesRequeridos, treinamentosRequeridos } = req.body;
    const clienteId = req.user.id;

    const novaFuncao = new Funcao({
      nome,
      descricao,
      clienteId,
      riscos,
      examesRequeridos,
      treinamentosRequeridos,
    });

    await novaFuncao.save();
    res.status(201).json(novaFuncao);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar função." });
  }
};

// Listar todas as Funções de um cliente
export const getFuncoes = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const funcoes = await Funcao.find({ clienteId }).sort({ nome: 1 });
    res.status(200).json(funcoes);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar funções." });
  }
};

// Obter uma Função específica por ID (com detalhes)
export const getFuncaoById = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const funcao = await Funcao.findOne({ _id: req.params.id, clienteId })
      .populate('riscos')
      .populate('examesRequeridos')
      .populate('treinamentosRequeridos');
      
    if (!funcao) return res.status(404).json({ message: "Função não encontrada." });
    res.status(200).json(funcao);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar função." });
  }
};

// Atualizar uma Função
export const updateFuncao = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const funcao = await Funcao.findOneAndUpdate(
      { _id: req.params.id, clienteId },
      req.body,
      { new: true } // Retorna o documento atualizado
    );
    if (!funcao) return res.status(404).json({ message: "Função não encontrada." });
    res.status(200).json(funcao);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar função." });
  }
};

// Deletar uma Função
export const deleteFuncao = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const funcao = await Funcao.findOneAndDelete({ _id: req.params.id, clienteId });
    if (!funcao) return res.status(404).json({ message: "Função não encontrada." });
    res.status(200).json({ message: "Função deletada com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar função." });
  }
};