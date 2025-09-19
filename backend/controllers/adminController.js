import User from '../models/User.js';
import Colaborador from '../models/Colaborador.js';
import Documento from '../models/Documento.js';
import Aso from '../models/Aso.js';
import RegistroTreinamento from '../models/RegistroTreinamento.js';
import Agendamento from '../models/Agendamento.js';
import Chamado from '../models/Chamado.js';

/**
 * Lista todos os usuários que são clientes.
 */
export const getClientes = async (req, res) => {
  try {
    // Busca todos os usuários onde o papel (role) é 'cliente'
    const clientes = await User.find({ role: 'cliente' })
      .select('-senha') // Exclui o campo de senha da resposta por segurança
      .sort({ razaoSocial: 1 }); // Ordena por ordem alfabética

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

    // Usamos Promise.all para buscar tudo em paralelo e otimizar o tempo
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

    // Retorna um grande objeto com todos os dados do cliente
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