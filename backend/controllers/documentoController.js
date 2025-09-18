// backend/controllers/documentoController.js (NOVO ARQUIVO)

import Documento from '../models/Documento.js';

export const uploadDocumento = async (req, res) => {
  try {
    // Multer nos dá o objeto 'file' com informações do upload
    if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }

    const { tipo, colaboradorId } = req.body;
    const clienteId = req.user.id; // Vem do authMiddleware

    const novoDocumento = new Documento({
      nomeArquivo: req.file.originalname,
      path: req.file.path,
      tipo: tipo,
      clienteId: clienteId,
      colaboradorId: colaboradorId || null, // Salva null se não for enviado
    });

    await novoDocumento.save();

    res.status(201).json(novoDocumento);

  } catch (error) {
    console.error("Erro ao fazer upload de documento:", error);
    res.status(500).json({ message: "Erro no servidor ao tentar fazer upload." });
  }
};

/**
 * Lista todos os documentos que pertencem ao cliente logado.
 */
export const getDocumentos = async (req, res) => {
  try {
    const clienteId = req.user.id;
    // Pega os parâmetros de filtro da URL (ex: /api/documentos?tipo=ASO&search=joao)
    const { tipo, colaboradorId, search } = req.query;

    // --- Lógica de Filtro Dinâmico ---
    const filtro = { clienteId: clienteId };

    if (tipo) {
      filtro.tipo = tipo;
    }
    if (colaboradorId) {
      filtro.colaboradorId = colaboradorId;
    }
    if (search) {
      // Busca pelo termo 'search' no nome do arquivo, ignorando maiúsculas/minúsculas
      filtro.nomeArquivo = { $regex: search, $options: 'i' };
    }
    // --- Fim da Lógica de Filtro ---

    const documentos = await Documento.find(filtro) // Usa o objeto de filtro dinâmico
      .populate('colaboradorId', 'nomeCompleto')
      .sort({ createdAt: -1 });

    res.status(200).json(documentos);

  } catch (error) {
    console.error("Erro ao listar documentos:", error);
    res.status(500).json({ message: "Erro no servidor ao tentar listar documentos." });
  }
};