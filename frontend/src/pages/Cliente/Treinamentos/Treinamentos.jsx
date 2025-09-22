import React, { useState, useEffect } from 'react';
import FormRegistrarTreinamento from './FormRegistrarTreinamento';
import api from '../../../api/axios'; // 1. IMPORTAR A INSTÂNCIA 'api'

const Treinamentos = () => {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para buscar os registros de treinamento da API
  const fetchRegistros = async () => {
    try {
      setLoading(true);
      // 2. SUBSTITUIR A CHAMADA 'fetch' PELA CHAMADA PADRÃO COM 'api'
      // Isto usa a URL correta do backend e adiciona o token de autenticação automaticamente.
      const response = await api.get('/registros-treinamento');
      setRegistros(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao buscar registros de treinamento.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  // Função para recarregar a lista após adicionar um novo registro
  const handleRegistroAdicionado = () => {
    fetchRegistros(); // Simplesmente chama a função de busca novamente para garantir os dados mais recentes
  };

  if (loading) return <div>A carregar treinamentos...</div>;
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
        <h2>Registos de Treinamentos</h2>
        <button onClick={() => setIsModalOpen(true)} style={{ padding: '10px 15px', cursor: 'pointer' }}>
          + Registar Treinamento
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
              <td colSpan="4" style={{ padding: '12px', textAlign: 'center' }}>Nenhum treinamento registado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Treinamentos;