// frontend/src/pages/Cliente/Colaboradores/PerfilColaborador.jsx (VERSÃO 100% COMPLETA)

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './PerfilColaborador.css'; // Importa o nosso arquivo de estilo

const PerfilColaborador = () => {
  const { id } = useParams(); // Pega o ID do colaborador da URL
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch(`/api/colaboradores/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Falha ao buscar perfil do colaborador.');
        const data = await response.json();
        setPerfil(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, [id]);

  if (loading) return <div>Carregando perfil...</div>;
  if (error) return <div style={{ color: 'red' }}>Erro: {error}</div>;
  if (!perfil) return <div>Perfil não encontrado.</div>;

  // Desestrutura todos os dados recebidos da API
  const { colaborador, detalhesFuncao, asos, treinamentos, documentos } = perfil;

  return (
    <div className="perfil-container">
      <Link to="/cliente/colaboradores" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#007bff', marginBottom: '20px' }}>
        <FaArrowLeft /> Voltar para a lista
      </Link>
      
      <header className="perfil-header">
        <h1>{colaborador.nomeCompleto}</h1>
        <p>{colaborador.funcao}</p>
      </header>

      {/* --- WIDGET DE REQUISITOS DA FUNÇÃO --- */}
      {detalhesFuncao && (
        <div className="perfil-widget">
          <h3>Requisitos para a Função de "{detalhesFuncao.nome}"</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <strong>Riscos Associados:</strong>
              <ul>{detalhesFuncao.riscos.map(r => <li key={r._id}>{r.nome}</li>)}</ul>
            </div>
            <div>
              <strong>Exames Requeridos:</strong>
              <ul>{detalhesFuncao.examesRequeridos.map(e => <li key={e._id}>{e.nome}</li>)}</ul>
            </div>
            <div>
              <strong>Treinamentos Requeridos:</strong>
              <ul>{detalhesFuncao.treinamentosRequeridos.map(t => <li key={t._id}>{t.nome}</li>)}</ul>
            </div>
          </div>
        </div>
      )}

      {/* --- WIDGET DE HISTÓRICO DE ASOS --- */}
      <div className="perfil-widget">
        <h3>Histórico de ASOs</h3>
        {asos.length > 0 ? (
          <table className="styled-table">
            <thead><tr><th>Tipo</th><th>Data</th><th>Vencimento</th><th>Resultado</th></tr></thead>
            <tbody>
              {asos.map(aso => (
                <tr key={aso._id}>
                  <td>{aso.tipoExame}</td>
                  <td>{new Date(aso.dataExame).toLocaleDateString('pt-BR')}</td>
                  <td>{new Date(aso.proximoExame).toLocaleDateString('pt-BR')}</td>
                  <td>{aso.resultado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>Nenhum ASO registrado.</p>}
      </div>

      {/* --- WIDGET DE HISTÓRICO DE TREINAMENTOS --- */}
      <div className="perfil-widget">
        <h3>Histórico de Treinamentos</h3>
        {treinamentos.length > 0 ? (
          <table className="styled-table">
            <thead><tr><th>Treinamento</th><th>Realização</th><th>Validade</th></tr></thead>
            <tbody>
              {treinamentos.map(trein => (
                <tr key={trein._id}>
                  <td>{trein.treinamentoId.nome}</td>
                  <td>{new Date(trein.dataRealizacao).toLocaleDateString('pt-BR')}</td>
                  <td>{new Date(trein.dataValidade).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>Nenhum treinamento registrado.</p>}
      </div>

       {/* --- WIDGET DE OUTROS DOCUMENTOS VINCULADOS --- */}
       <div className="perfil-widget">
        <h3>Outros Documentos Vinculados</h3>
        {documentos.length > 0 ? (
          <table className="styled-table">
            <thead><tr><th>Arquivo</th><th>Tipo</th><th>Ações</th></tr></thead>
            <tbody>
              {documentos.map(doc => (
                <tr key={doc._id}>
                  <td>{doc.nomeArquivo}</td>
                  <td>{doc.tipo}</td>
                  <td><a href={`http://localhost:3001/${doc.path.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">Download</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>Nenhum outro documento vinculado.</p>}
      </div>
    </div>
  );
};

export default PerfilColaborador;