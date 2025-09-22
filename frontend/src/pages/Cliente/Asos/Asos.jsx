import React, { useState, useEffect } from 'react';
import FormRegistrarAso from './FormRegistrarAso';
import api from '../../../api/axios'; 

const Asos = () => {
  const [asos, setAsos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAsos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/asos');
      setAsos(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao buscar ASOs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsos();
  }, []);

  const handleAsoAdicionado = (novoAso) => {
    const listaAtualizada = [...asos, novoAso];
    listaAtualizada.sort((a, b) => new Date(a.proximoExame) - new Date(b.proximoExame));
    setAsos(listaAtualizada);
  };

  // O resto do seu código JSX permanece exatamente o mesmo
  if (loading) return <div>Carregando ASOs...</div>;
  if (error) return <div style={{ color: 'red' }}>Erro: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      {isModalOpen && (
        <FormRegistrarAso
          onClose={() => setIsModalOpen(false)}
          onAsoAdicionado={handleAsoAdicionado}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Registros de ASO</h2>
        <button onClick={() => setIsModalOpen(true)} style={{ padding: '10px 15px', cursor: 'pointer' }}>
          + Registrar Novo ASO
        </button>
      </div>

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Colaborador</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Tipo</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Data do Exame</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Vencimento</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Resultado</th>
          </tr>
        </thead>
        <tbody>
          {asos.length > 0 ? (
            asos.map(aso => (
              <tr key={aso._id}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{aso.colaboradorId?.nomeCompleto || 'N/A'}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{aso.tipoExame}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{new Date(aso.dataExame).toLocaleDateString('pt-BR')}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{new Date(aso.proximoExame).toLocaleDateString('pt-BR')}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{aso.resultado}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: '12px', textAlign: 'center' }}>Nenhum ASO registrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Asos;