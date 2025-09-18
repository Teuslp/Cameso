// frontend/src/pages/Cliente/Documentos/Documentos.jsx (VERSÃO COMPLETA E FINAL)

import React, { useState, useEffect } from 'react';

const Documentos = () => {
  // --- ESTADOS DO COMPONENTE ---
  const [colaboradores, setColaboradores] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  // Estados para o formulário
  const [arquivo, setArquivo] = useState(null);
  const [tipo, setTipo] = useState('ASO');
  const [colaboradorSelecionadoId, setColaboradorSelecionadoId] = useState('');
  const [status, setStatus] = useState({ loading: false, error: null, success: null });

  // --- FUNÇÕES DE BUSCA DE DADOS ---
  const fetchDocumentos = async () => {
    try {
      setLoadingDocs(true);
      const token = localStorage.getItem('userToken');
      const response = await fetch('/api/documentos', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Falha ao buscar documentos.');
      const data = await response.json();
      setDocumentos(data);
    } catch (err) {
      // Usando 'prev' para não sobrescrever o status de sucesso do upload
      setStatus(prev => ({ ...prev, error: err.message }));
    } finally {
      setLoadingDocs(false);
    }
  };

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('/api/colaboradores', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Falha ao buscar colaboradores.');
        const data = await response.json();
        setColaboradores(data);
      } catch (err) {
        setStatus(prev => ({ ...prev, error: err.message }));
      }
    };
    
    fetchColaboradores();
    fetchDocumentos();
  }, []); // O array vazio [] garante que a busca ocorre apenas uma vez

  // --- FUNÇÕES DE MANIPULAÇÃO DO FORMULÁRIO ---
  const handleFileChange = (e) => {
    setArquivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!arquivo) {
      setStatus({ loading: false, error: 'Por favor, selecione um arquivo.', success: null });
      return;
    }

    setStatus({ loading: true, error: null, success: null });

    const formData = new FormData();
    formData.append('documento', arquivo);
    formData.append('tipo', tipo);
    if (colaboradorSelecionadoId) {
      formData.append('colaboradorId', colaboradorSelecionadoId);
    }

    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('/api/documentos/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha no upload do documento.');
      }
      
      setStatus({ loading: false, error: null, success: 'Documento enviado com sucesso!' });
      e.target.reset(); // Limpa o formulário
      setArquivo(null);
      
      fetchDocumentos(); // Atualiza a lista de documentos
      
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: null });
    }
  };

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <section>
      <h2>Gestão de Documentos</h2>
      
      {/* SEÇÃO DO FORMULÁRIO DE UPLOAD */}
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginTop: '20px', marginBottom: '40px' }}>
        <h3>Enviar Novo Documento</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="tipo">Tipo de Documento:</label><br/>
          <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value="ASO">ASO (Atestado de Saúde Ocupacional)</option>
            <option value="PGR">PGR (Programa de Gerenciamento de Riscos)</option>
            <option value="PCMSO">PCMSO (Prog. de Contr. Médico de Saúde Ocup.)</option>
            <option value="Certificado">Certificado (NRs, etc)</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="colaborador">Vincular ao Colaborador (Opcional):</label><br/>
          <select id="colaborador" value={colaboradorSelecionadoId} onChange={(e) => setColaboradorSelecionadoId(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value="">-- Documento da Empresa --</option>
            {colaboradores.map(col => (
              <option key={col._id} value={col._id}>{col.nomeCompleto}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="arquivo">Selecione o Arquivo:</label><br/>
          <input type="file" id="arquivo" onChange={handleFileChange} />
        </div>

        <button type="submit" disabled={status.loading} style={{ padding: '10px 15px' }}>
          {status.loading ? 'Enviando...' : 'Enviar Documento'}
        </button>

        {status.error && <p style={{ color: 'red', marginTop: '10px' }}>Erro: {status.error}</p>}
        {status.success && <p style={{ color: 'green', marginTop: '10px' }}>{status.success}</p>}
      </form>

      {/* SEÇÃO DA LISTA DE DOCUMENTOS */}
      <div>
        <h3>Documentos Enviados</h3>
        {loadingDocs ? (
          <p>Carregando documentos...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f2f2f2' }}>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Arquivo</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Tipo</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Colaborador Vinculado</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Data de Envio</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {documentos.length > 0 ? (
                documentos.map((doc) => (
                  <tr key={doc._id}>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{doc.nomeArquivo}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{doc.tipo}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {doc.colaboradorId ? doc.colaboradorId.nomeCompleto : 'Empresa'}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {new Date(doc.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      <a 
                        href={`http://localhost:3001/${doc.path.replace(/\\/g, '/')}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '12px', textAlign: 'center' }}>Nenhum documento encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Documentos;