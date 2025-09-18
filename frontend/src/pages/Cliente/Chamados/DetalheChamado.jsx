// frontend/src/pages/Cliente/Chamados/DetalheChamado.jsx (NOVO ARQUIVO)
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DetalheChamado = () => {
    const { id } = useParams(); // Pega o ID do chamado da URL
    const [chamado, setChamado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [novaResposta, setNovaResposta] = useState('');

    const fetchChamado = async () => {
        // ... (lógica para buscar o chamado por ID)
    };
    
    useEffect(() => {
        const fetchChamado = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await fetch(`/api/chamados/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
                if (!response.ok) throw new Error('Chamado não encontrado.');
                const data = await response.json();
                setChamado(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchChamado();
    }, [id]);

    const handleResponder = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(`/api/chamados/${id}/responder`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ conteudo: novaResposta })
            });
            if (!response.ok) throw new Error('Erro ao enviar resposta.');
            const data = await response.json();
            setChamado(data); // Atualiza o chamado com a nova mensagem
            setNovaResposta(''); // Limpa o campo de texto
        } catch (err) {
            console.error(err);
        }
    };
    
    if (loading) return <div>Carregando conversa...</div>;
    if (!chamado) return <div>Chamado não encontrado.</div>;

    return (
        <div style={{ padding: '20px' }}>
            <Link style={{ padding: '12px', border: '1px solid #ddd' }}to="/cliente/chamados">{"< Voltar para a lista de chamados"}</Link>
            <h2 style={{ marginTop: '20px' }}>{chamado.assunto}</h2>
            <div style={{ border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px', padding: '20px', minHeight: '300px' }}>
                {chamado.mensagens.map(msg => (
                    <div key={msg._id} style={{ marginBottom: '15px', padding: '10px', borderRadius: '8px', backgroundColor: msg.autor.role === 'cliente' ? '#e1f5fe' : '#f1f8e9' }}>
                        <strong>{msg.autor.nome} ({msg.autor.role}):</strong>
                        <p style={{ margin: '5px 0 0' }}>{msg.conteudo}</p>
                        <small>{new Date(msg.timestamp).toLocaleString('pt-BR')}</small>
                    </div>
                ))}
            </div>

            <form onSubmit={handleResponder} style={{ marginTop: '20px' }}>
                <textarea 
                    value={novaResposta} 
                    onChange={e => setNovaResposta(e.target.value)}
                    placeholder="Escreva sua resposta..." 
                    rows="4" 
                    required 
                    style={{ width: '100%', padding: '10px' }}
                />
                <button type="submit" style={{ marginTop: '10px', padding: '10px 15px' }}>Enviar Resposta</button>
            </form>
        </div>
    );
};

export default DetalheChamado;