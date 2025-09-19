// backend/workers/notificationWorker.js (VERSÃO ATUALIZADA)

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Aso from '../models/Aso.js';
import RegistroTreinamento from '../models/RegistroTreinamento.js';
import Notificacao from '../models/Notificacao.js';

dotenv.config();

const gerarNotificacoesDeVencimento = async () => {
  console.log('Iniciando verificação de vencimentos...');
  
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hoje = new Date();
    const emSeteDias = new Date();
    emSeteDias.setDate(hoje.getDate() + 7);

    // 1. Busca ASOs vencendo nos próximos 7 dias
    const asosAVencer = await Aso.find({
      proximoExame: { $gte: hoje, $lt: emSeteDias }
    }).populate('colaboradorId', 'nomeCompleto');

    for (const aso of asosAVencer) {
      const mensagem = `O ASO de ${aso.colaboradorId.nomeCompleto} vence em ${new Date(aso.proximoExame).toLocaleDateString('pt-BR')}.`;
      await Notificacao.findOneAndUpdate(
        { clienteId: aso.clienteId, mensagem: mensagem },
        { clienteId: aso.clienteId, mensagem: mensagem, link: `/cliente/colaboradores/${aso.colaboradorId._id}` },
        { upsert: true, new: true }
      );
    }
    
    // --- LÓGICA ADICIONADA PARA TREINAMENTOS ---
    const treinamentosAVencer = await RegistroTreinamento.find({
        dataValidade: { $gte: hoje, $lt: emSeteDias }
    }).populate('colaboradorId', 'nomeCompleto').populate('treinamentoId', 'nome');

    for (const registro of treinamentosAVencer) {
        const mensagem = `O treinamento de ${registro.treinamentoId.nome} de ${registro.colaboradorId.nomeCompleto} vence em ${new Date(registro.dataValidade).toLocaleDateString('pt-BR')}.`;
        await Notificacao.findOneAndUpdate(
            { clienteId: registro.clienteId, mensagem: mensagem },
            { clienteId: registro.clienteId, mensagem: mensagem, link: `/cliente/colaboradores/${registro.colaboradorId._id}` },
            { upsert: true, new: true }
        );
    }
    // --- FIM DA LÓGICA ADICIONADA ---

    console.log(`${asosAVencer.length} notificações de ASO e ${treinamentosAVencer.length} de Treinamento processadas.`);

  } catch (error)
 {
    console.error('Erro no worker de notificações:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Verificação de vencimentos finalizada.');
  }
};

// Se precisar testar manualmente, execute este arquivo com 'node'
// gerarNotificacoesDeVencimento(); 

export default gerarNotificacoesDeVencimento;