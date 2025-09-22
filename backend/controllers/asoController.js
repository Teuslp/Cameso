// backend/controllers/asoController.js (NOVO ARQUIVO)

import Aso from '../models/Aso.js';

/**
 * Cria um novo registro de ASO.
 */
export const createAso = async (req, res) => {
  try {
    const { colaboradorId, tipoExame, resultado, dataExame, proximoExame, documentoId } = req.body;
    const clienteId = req.user.id; // Vem do token de autenticação

    // Validação
    if (!colaboradorId || !tipoExame || !resultado || !dataExame || !proximoExame) {
      return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    const novoAso = new Aso({
      clienteId,
      colaboradorId,
      tipoExame,
      resultado,
      dataExame,
      proximoExame,
      documentoId: documentoId || null
    });

    await novoAso.save();
    res.status(201).json(novoAso);

  } catch (error) {
    console.error("Erro ao criar ASO:", error);
    res.status(500).json({ message: "Erro no servidor ao tentar criar ASO." });
  }
};


/**
 * Lista todos os ASOs de um cliente.
 */
export const getAsos = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const asos = await Aso.find({ clienteId: clienteId })
      .populate('colaboradorId', 'nomeCompleto')
      .sort({ proximoExame: 1 });
    res.status(200).json(asos);
  } catch (error) {
    // LOG APRIMORADO
    console.error("Erro detalhado ao listar ASOs:", error.stack); 
    res.status(500).json({ message: "Erro no servidor ao tentar listar ASOs." });
  }
};