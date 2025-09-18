// frontend/src/pages/Cliente/Treinamentos/Treinamentos.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';
import FormRegistrarTreinamento from './FormRegistrarTreinamento';

const Treinamentos = () => {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('/api/registros-treinamento', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Falha ao buscar registros de treinamento.');
        const data = await response.json();
        setRegistros(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistros();
  }, []);

  const handleRegistroAdicionado = (novoRegistro) => {
    // Para garantir que os nomes apareçam, o ideal é buscar a lista novamente
    const fetchRegistros = async () => {
        const token = localStorage.getItem('userToken');
        const response = await fetch('/api/registros-treinamento', { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await response.json();
        if(response.ok) setRegistros(data);
    };
    fetchRegistros();
  };

  if (loading) return <div>Carregando treinamentos...</div>;
  if (error) return <div style={{ color: 'red' }}>Erro: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      {isModalOpen && (
        <FormRegistrarTreinamento
          onClose={() => setIsModalOpen(false)}
          onRegistroAdicionado={handleRegistroAdicionado}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Registros de Treinamentos</h2>
        <button onClick={() => setIsModalOpen(true)} style={{ padding: '10px 15px', cursor: 'pointer' }}>
          + Registrar Treinamento
        </button>
      </div>

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Colaborador</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Treinamento</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Data de Realização</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Validade</th>
          </tr>
        </thead>
        <tbody>
          {registros.length > 0 ? (
            registros.map(reg => (
              <tr key={reg._id}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{reg.colaboradorId?.nomeCompleto || 'N/A'}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{reg.treinamentoId?.nome || 'N/A'}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{new Date(reg.dataRealizacao).toLocaleDateString('pt-BR')}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{new Date(reg.dataValidade).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ padding: '12px', textAlign: 'center' }}>Nenhum treinamento registrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Treinamentos;