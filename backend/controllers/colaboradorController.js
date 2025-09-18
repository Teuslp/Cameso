import Colaborador from '../models/Colaborador.js';
import User from '../models/User.js';
import Aso from '../models/Aso.js';
import RegistroTreinamento from '../models/RegistroTreinamento.js';
import Documento from '../models/Documento.js';
import Funcao from '../models/Funcao.js';

/**
 * Cria um novo colaborador no banco de dados.
 */
export const createColaborador = async (req, res) => {
  try {
    const { nomeCompleto, cpf, funcao, dataAdmissao } = req.body;
    
    // O ID do usuário cliente vem do middleware de autenticação (authMiddleware)
    // que foi executado antes de chegar aqui. Ele é o "dono" deste colaborador.
    const clienteId = req.user.id;

    // Validação básica
    if (!nomeCompleto || !cpf || !funcao || !dataAdmissao) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    // Verifica se já existe um colaborador com este CPF
    const colaboradorExistente = await Colaborador.findOne({ cpf });
    if (colaboradorExistente) {
      return res.status(400).json({ message: "Já existe um colaborador com este CPF." });
    }

    const novoColaborador = new Colaborador({
      nomeCompleto,
      cpf,
      funcao,
      dataAdmissao,
      clienteId // Vinculando o colaborador ao cliente logado
    });

    await novoColaborador.save();

    res.status(201).json(novoColaborador);

  } catch (error) {
    console.error("Erro ao criar colaborador:", error);
    res.status(500).json({ message: "Erro no servidor ao tentar criar colaborador." });
  }
};


/**
 * Lista todos os colaboradores que pertencem ao cliente logado.
 */
export const getColaboradores = async (req, res) => {
  try {
    // O ID do usuário cliente vem do middleware de autenticação.
    const clienteId = req.user.id;

    // Busca no banco de dados APENAS os colaboradores cujo clienteId
    // seja igual ao ID do usuário que fez a requisição.
    // Isso garante que um cliente não veja os funcionários de outro.
    // AJUSTE IMPORTANTE: Adicionamos o filtro para buscar apenas colaboradores ativos.
    const colaboradores = await Colaborador.find({ clienteId: clienteId, ativo: true });

    res.status(200).json(colaboradores);

  } catch (error) {
    console.error("Erro ao listar colaboradores:", error);
    res.status(500).json({ message: "Erro no servidor ao tentar listar colaboradores." });
  }
};

/**
 * Atualiza os dados de um colaborador existente.
 */
export const updateColaborador = async (req, res) => {
  try {
    const { id: colaboradorId } = req.params; // Pega o ID do colaborador da URL (ex: /api/colaboradores/123)
    const clienteId = req.user.id; // Pega o ID do cliente logado (do token)

    // Encontra o colaborador pelo seu ID E garante que ele pertence ao cliente que está fazendo a requisição.
    // Esta é uma checagem de segurança crucial.
    const colaborador = await Colaborador.findOne({ _id: colaboradorId, clienteId: clienteId });

    if (!colaborador) {
      return res.status(404).json({ message: "Colaborador não encontrado ou você não tem permissão para editá-lo." });
    }

    // Atualiza os campos do colaborador com os dados recebidos no corpo da requisição
    const { nomeCompleto, cpf, funcao, dataAdmissao } = req.body;
    colaborador.nomeCompleto = nomeCompleto ?? colaborador.nomeCompleto;
    colaborador.cpf = cpf ?? colaborador.cpf;
    colaborador.funcao = funcao ?? colaborador.funcao;
    colaborador.dataAdmissao = dataAdmissao ?? colaborador.dataAdmissao;
    
    // Se o CPF foi alterado, verifica se o novo CPF já não está em uso por outro colaborador
    if (cpf && cpf !== colaborador.cpf) {
      const colaboradorExistente = await Colaborador.findOne({ cpf });
      if (colaboradorExistente) {
        return res.status(400).json({ message: "O novo CPF informado já está em uso por outro colaborador." });
      }
    }

    const colaboradorAtualizado = await colaborador.save();

    res.status(200).json(colaboradorAtualizado);

  } catch (error) {
    console.error("Erro ao atualizar colaborador:", error);
    res.status(500).json({ message: "Erro no servidor ao tentar atualizar colaborador." });
  }
};

/**
 * Desativa um colaborador (soft delete).
 */
export const deactivateColaborador = async (req, res) => {
  try {
    const { id: colaboradorId } = req.params;
    const clienteId = req.user.id;

    const colaborador = await Colaborador.findOne({ _id: colaboradorId, clienteId: clienteId });

    if (!colaborador) {
      return res.status(404).json({ message: "Colaborador não encontrado ou você não tem permissão para modificá-lo." });
    }

    colaborador.ativo = false; // A "mágica" do soft delete acontece aqui.
    await colaborador.save();

    res.status(200).json({ message: "Colaborador desativado com sucesso." });

  } catch (error) {
    console.error("Erro ao desativar colaborador:", error);
    res.status(500).json({ message: "Erro no servidor ao tentar desativar colaborador." });
  }
};

/**
 * Busca um colaborador específico pelo ID e todos os seus dados relacionados.
 */
export const getColaboradorById = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const { id: colaboradorId } = req.params;

    const colaborador = await Colaborador.findOne({ _id: colaboradorId, clienteId: clienteId });
    if (!colaborador) {
      return res.status(404).json({ message: "Colaborador não encontrado ou acesso não permitido." });
    }

    // 2. ADICIONAMOS A BUSCA PELOS DETALHES DA FUNÇÃO DELE
    const detalhesFuncao = await Funcao.findOne({ clienteId: clienteId, nome: colaborador.funcao })
        .populate('riscos')
        .populate('examesRequeridos')
        .populate('treinamentosRequeridos');

    const [asos, treinamentos, documentos] = await Promise.all([
      Aso.find({ colaboradorId: colaboradorId }).sort({ dataExame: -1 }),
      RegistroTreinamento.find({ colaboradorId: colaboradorId }).populate('treinamentoId', 'nome').sort({ dataRealizacao: -1 }),
      Documento.find({ colaboradorId: colaboradorId }).sort({ createdAt: -1 })
    ]);

    // 3. ADICIONAMOS OS DETALHES DA FUNÇÃO À RESPOSTA
    res.status(200).json({
      colaborador,
      detalhesFuncao, // Enviamos os requisitos junto
      asos,
      treinamentos,
      documentos
    });

  } catch (error) {
    console.error("Erro ao buscar detalhes do colaborador:", error);
    res.status(500).json({ message: "Erro no servidor ao buscar detalhes do colaborador." });
  }
};