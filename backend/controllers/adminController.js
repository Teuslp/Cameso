import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import Colaborador from '../models/Colaborador.js';
import Documento from '../models/Documento.js';
import Aso from '../models/Aso.js';
import RegistroTreinamento from '../models/RegistroTreinamento.js';
import Agendamento from '../models/Agendamento.js';
import Chamado from '../models/Chamado.js';


/**
 * Lista todos os usuários que são contas principais de cliente.
 */
export const getClientes = async (req, res) => {
  try {
    // --- CORREÇÃO APLICADA AQUI ---
    // Agora procuramos por utilizadores cujo tipoConta é 'cliente_master'.
    const clientes = await User.find({ tipoConta: 'cliente_master' })
      .select('-senha')
      .sort({ razaoSocial: 1 });

    res.status(200).json(clientes);
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    res.status(500).json({ message: "Erro no servidor ao listar clientes." });
  }
};

/**
 * Busca todos os dados detalhados de um cliente específico.
 */
export const getClienteById = async (req, res) => {
  try {
    const { id: clienteId } = req.params;

    const [
      cliente,
      colaboradores,
      documentos,
      asos,
      treinamentos,
      agendamentos,
      chamados
    ] = await Promise.all([
      User.findById(clienteId).select('-senha'),
      Colaborador.find({ clienteId }),
      Documento.find({ clienteId }).sort({ createdAt: -1 }),
      Aso.find({ clienteId }).populate('colaboradorId', 'nomeCompleto').sort({ proximoExame: 1 }),
      RegistroTreinamento.find({ clienteId }).populate('colaboradorId', 'nomeCompleto').populate('treinamentoId', 'nome').sort({ dataValidade: 1 }),
      Agendamento.find({ clienteId }).populate('colaboradorId', 'nomeCompleto').sort({ createdAt: -1 }),
      Chamado.find({ clienteId }).sort({ updatedAt: -1 })
    ]);

    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    res.status(200).json({
      cliente,
      colaboradores,
      documentos,
      asos,
      treinamentos,
      agendamentos,
      chamados
    });

  } catch (error) {
    console.error("Erro ao buscar detalhes do cliente:", error);
    res.status(500).json({ message: "Erro no servidor ao buscar detalhes do cliente." });
  }
};

/**
 * Cria uma nova conta de cliente (ação de admin).
 */
export const createCliente = async (req, res) => {
  try {
    const { nome, email, senha, razaoSocial, cnpj } = req.body;

    if (!nome || !email || !senha || !razaoSocial) {
        return res.status(400).json({ message: "Nome, email, senha e razão social são obrigatórios." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Este email já está cadastrado." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const novoCliente = new User({
      nome,
      email,
      senha: hashedPassword,
      razaoSocial,
      cnpj,
      // --- CORREÇÃO APLICADA AQUI ---
      // Agora, ao criar um cliente, definimos o tipoConta como 'cliente_master'.
      tipoConta: 'cliente_master',
    });

    await novoCliente.save();

    const clienteCriado = await User.findById(novoCliente._id).select('-senha');
    res.status(201).json(clienteCriado);

  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    res.status(500).json({ message: "Erro no servidor ao tentar criar cliente." });
  }
};

/**
 * Atualiza os dados de um cliente existente.
 */
export const updateCliente = async (req, res) => {
    try {
        const { id: clienteId } = req.params;
        const { razaoSocial, cnpj, nome, email } = req.body;

        const updatedData = { razaoSocial, cnpj, nome, email };

        const clienteAtualizado = await User.findByIdAndUpdate(clienteId, updatedData, { new: true }).select('-senha');

        if (!clienteAtualizado) {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }
        res.status(200).json(clienteAtualizado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar cliente." });
    }
};

/**
 * Desativa uma conta de cliente (soft delete).
 */
export const deleteCliente = async (req, res) => {
    try {
        const { id: clienteId } = req.params;
        const clienteDesativado = await User.findByIdAndUpdate(clienteId, { ativo: false }, { new: true });

        if (!clienteDesativado) {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }
        res.status(200).json({ message: "Cliente desativado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao desativar cliente." });
    }
};
