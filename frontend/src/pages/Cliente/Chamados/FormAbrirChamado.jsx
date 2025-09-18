// frontend/src/pages/Cliente/Chamados/FormAbrirChamado.jsx (NOVO ARQUIVO)
import React, { useState } from 'react';

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
            const token = localStorage.getItem('userToken');
            const response = await fetch('/api/chamados', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ assunto, conteudo })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Erro ao abrir chamado');
            onChamadoAdicionado();
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '600px' }}>
                <h2>Abrir Novo Chamado</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Assunto</label>
                        <input type="text" value={assunto} onChange={e => setAssunto(e.target.value)} required style={{ width: '100%', padding: '8px' }}/>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Descreva sua solicitação</label>
                        <textarea value={conteudo} onChange={e => setConteudo(e.target.value)} required rows="5" style={{ width: '100%', padding: '8px' }}/>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose}>Cancelar</button>
                        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar Chamado'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormAbrirChamado;