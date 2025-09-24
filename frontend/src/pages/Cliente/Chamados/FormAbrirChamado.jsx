import React, { useState } from 'react';
import api from '../../../api/axios';

const FormAbrirChamado = ({ onClose, onChamadoAdicionado }) => {
    const [assunto, setAssunto] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // --- CORREÇÃO APLICADA AQUI ---
            // 1. Usar api.post para enviar dados
            // 2. Usar o caminho correto ('/chamados') sem duplicar '/api'
            // 3. Passar os dados como um objeto simples
            const response = await api.post('/chamados', { assunto, conteudo });

            if (response.status === 201) {
                onChamadoAdicionado();
                onClose();
            } else {
                throw new Error('Erro ao abrir chamado');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Ocorreu um erro.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '600px' }}>
                <h2>Abrir Novo Chamado</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Assunto</label>
                        <input type="text" value={assunto} onChange={e => setAssunto(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '4px' }}/>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Descreva sua solicitação</label>
                        <textarea value={conteudo} onChange={e => setConteudo(e.target.value)} required rows="5" style={{ width: '100%', padding: '8px', marginTop: '4px' }}/>
                    </div>
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose} disabled={loading}>Cancelar</button>
                        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar Chamado'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormAbrirChamado;
