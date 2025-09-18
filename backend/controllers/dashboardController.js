// backend/controllers/dashboardController.js (NOVO ARQUIVO)

import Colaborador from '../models/Colaborador.js';
import Aso from '../models/Aso.js';
import RegistroTreinamento from '../models/RegistroTreinamento.js';

/**
 * Coleta e resume os dados principais para o dashboard do cliente.
 */
export const getDashboardSummary = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const hoje = new Date();
    const proximoMes = new Date();
    proximoMes.setDate(hoje.getDate() + 30);

    // Usaremos Promise.all para executar todas as buscas no banco de dados em paralelo,
    // o que é muito mais rápido do que fazer uma de cada vez.

    const [
      totalColaboradores,
      asosAVencer,
      asosVencidos,
      treinamentosAVencer
    ] = await Promise.all([
      // 1. Contar o total de colaboradores ativos
      Colaborador.countDocuments({ clienteId: clienteId, ativo: true }),

      // 2. Contar ASOs que vencerão nos próximos 30 dias
      Aso.countDocuments({
        clienteId: clienteId,
        proximoExame: { $gte: hoje, $lte: proximoMes }
      }),

      // 3. Contar ASOs que já venceram
      Aso.countDocuments({
        clienteId: clienteId,
        proximoExame: { $lt: hoje }
      })
    ]);

    // Monta o objeto de resposta com os dados calculados
    const summary = {
      totalColaboradores,
      asosAVencer,
      asosVencidos,
      treinamentosAVencer
    };

    res.status(200).json(summary);

  } catch (error) {
    console.error("Erro ao gerar resumo do dashboard:", error);
    res.status(500).json({ message: "Erro no servidor ao gerar resumo." });
  }
};