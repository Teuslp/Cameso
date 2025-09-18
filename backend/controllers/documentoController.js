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
    const clienteId = req.user.id; // ID do cliente logado, vindo do authMiddleware

    const documentos = await Documento.find({ clienteId: clienteId })
      .populate('colaboradorId', 'nomeCompleto') // A "mágica" para buscar o nome do colaborador
      .sort({ createdAt: -1 }); // Ordena pelos mais recentes primeiro

    res.status(200).json(documentos);

  } catch (error) {
    console.error("Erro ao listar documentos:", error);
    res.status(500).json({ message: "Erro no servidor ao tentar listar documentos." });
  }
};