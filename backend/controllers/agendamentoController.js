// backend/controllers/agendamentoController.js (VERSÃO ATUALIZADA)

import Agendamento from '../models/Agendamento.js';
import Notificacao from '../models/Notificacao.js'; // Importa o Model de Notificação

// --- Funções do Cliente (já existentes) ---
export const createAgendamento = async (req, res) => {
    // ... (código existente)
    // Opcional: Adicionar notificação para o admin aqui quando um cliente cria
};
export const getAgendamentos = async (req, res) => { /* ... (código existente) ... */ };


// --- NOVAS FUNÇÕES EXCLUSIVAS DO ADMIN ---

/**
 * [ADMIN] Lista todos os agendamentos de todos os clientes.
 */
export const getAllAgendamentosAdmin = async (req, res) => {
    try {
        const agendamentos = await Agendamento.find({})
            .populate('clienteId', 'razaoSocial nome')
            .populate('colaboradorId', 'nomeCompleto')
            .sort({ status: 1, dataSugerida: 1 }); // Ordena por status e data
        res.status(200).json(agendamentos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar agendamentos." });
    }
};

/**
 * [ADMIN] Confirma ou atualiza um agendamento.
 */
export const updateAgendamentoAdmin = async (req, res) => {
    try {
        const { id: agendamentoId } = req.params;
        const { dataConfirmada, localConfirmado, instrucoes, status } = req.body;

        const agendamento = await Agendamento.findById(agendamentoId);
        if (!agendamento) {
            return res.status(404).json({ message: "Agendamento não encontrado." });
        }

        // Atualiza os campos
        agendamento.dataConfirmada = dataConfirmada || agendamento.dataConfirmada;
        agendamento.localConfirmado = localConfirmado || agendamento.localConfirmado;
        agendamento.instrucoes = instrucoes || agendamento.instrucoes;
        agendamento.status = status || agendamento.status;

        const agendamentoAtualizado = await agendamento.save();

        // Cria uma notificação para o cliente quando o agendamento é confirmado
        if (status === 'Confirmado') {
            await new Notificacao({
                clienteId: agendamento.clienteId,
                mensagem: `Seu agendamento para ${agendamento.tipoExame} foi confirmado para ${new Date(dataConfirmada).toLocaleDateString('pt-BR')}.`,
                link: `/cliente/agenda`
            }).save();
        }

        res.status(200).json(agendamentoAtualizado);

    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar agendamento." });
    }
};