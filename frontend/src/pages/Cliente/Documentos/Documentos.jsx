// frontend/src/pages/Cliente/Documentos/Documentos.jsx (VERSÃO 2.0 COMPLETA)

import React, { useState, useEffect } from 'react';

const Documentos = () => {
  // --- ESTADOS GERAIS ---
  const [colaboradores, setColaboradores] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  // --- ESTADO PARA OS FILTROS ---
  const [filtros, setFiltros] = useState({
    search: '',
    tipo: '',
    colaboradorId: ''
  });

  // --- ESTADOS PARA O FORMULÁRIO DE UPLOAD ---
  const [arquivo, setArquivo] = useState(null);
  const [tipoUpload, setTipoUpload] = useState('ASO');
  const [colaboradorUploadId, setColaboradorUploadId] = useState('');
  const [statusUpload, setStatusUpload] = useState({ loading: false, error: null, success: null });

  // --- BUSCA DE DADOS ---

  // Busca a lista de colaboradores (para os dropdowns) uma única vez
  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('/api/colaboradores', { headers: { 'Authorization': `Bearer ${token}` } });
        if (!response.ok) throw new Error('Falha ao buscar colaboradores.');
        const data = await response.json();
        setColaboradores(data);
      } catch (err) {
        // Lida com erro de busca de colaboradores
      }
    };
    fetchColaboradores();
  }, []);

  // Busca a lista de documentos toda vez que os filtros mudam
  useEffect(() => {
    const fetchDocumentos = async () => {
      setLoadingDocs(true);
      try {
        const token = localStorage.getItem('userToken');
        const params = new URLSearchParams();
        if (filtros.search) params.append('search', filtros.search);
        if (filtros.tipo) params.append('tipo', filtros.tipo);
        if (filtros.colaboradorId) params.append('colaboradorId', filtros.colaboradorId);
        
        const response = await fetch(`/api/documentos?${params.toString()}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Falha ao buscar documentos.');
        const data = await response.json();
        setDocumentos(data);
      } catch (err) {
        // Lida com erro de busca de documentos
      } finally {
        setLoadingDocs(false);
      }
    };
    fetchDocumentos();
  }, [filtros]);

  // --- MANIPULADORES DE EVENTOS ---

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const limparFiltros = () => {
    setFiltros({ search: '', tipo: '', colaboradorId: '' });
  };
  
  const handleFileChange = (e) => {
    setArquivo(e.target.files[0]);
  };

  const handleSubmitUpload = async (e) => {
    e.preventDefault();
    if (!arquivo) {
      setStatusUpload({ loading: false, error: 'Por favor, selecione um arquivo.', success: null });
      return;
    }
    setStatusUpload({ loading: true, error: null, success: null });

    const formData = new FormData();
    formData.append('documento', arquivo);
    formData.append('tipo', tipoUpload);
    if (colaboradorUploadId) {
      formData.append('colaboradorId', colaboradorUploadId);
    }

    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('/api/documentos/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha no upload do documento.');
      }
      
      setStatusUpload({ loading: false, error: null, success: 'Documento enviado com sucesso!' });
      e.target.reset();
      setArquivo(null);
      // Força a atualização da lista de documentos limpando os filtros (que dispara o useEffect)
      limparFiltros(); 
      
    } catch (err) {
      setStatusUpload({ loading: false, error: err.message, success: null });
    }
  };

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <section>
      <h2>Gestão de Documentos</h2>
      
      {/* Formulário de Upload */}
      <form onSubmit={handleSubmitUpload} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h3>Enviar Novo Documento</h3>
        <div style={{ marginBottom: '15px' }}>
          <label>Tipo de Documento:</label><br/>
          <select value={tipoUpload} onChange={(e) => setTipoUpload(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value="ASO">ASO</option> <option value="PGR">PGR</option> <option value="PCMSO">PCMSO</option>
            <option value="Certificado">Certificado</option> <option value="Outro">Outro</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Vincular ao Colaborador (Opcional):</label><br/>
          <select value={colaboradorUploadId} onChange={(e) => setColaboradorUploadId(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value="">-- Documento da Empresa --</option>
            {colaboradores.map(col => (<option key={col._id} value={col._id}>{col.nomeCompleto}</option>))}
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Selecione o Arquivo:</label><br/>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit" disabled={statusUpload.loading} style={{ padding: '10px 15px' }}>
          {statusUpload.loading ? 'Enviando...' : 'Enviar Documento'}
        </button>
        {statusUpload.error && <p style={{ color: 'red', marginTop: '10px' }}>Erro: {statusUpload.error}</p>}
        {statusUpload.success && <p style={{ color: 'green', marginTop: '10px' }}>{statusUpload.success}</p>}
      </form>

      {/* Lista de Documentos Enviados */}
      <div style={{ marginTop: '40px' }}>
        <h3>Documentos Enviados</h3>

        {/* Barra de Filtros */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '20px' }}>
          <input type="text" name="search" placeholder="Buscar por nome do arquivo..." value={filtros.search} onChange={handleFiltroChange} style={{ padding: '8px' }}/>
          <select name="tipo" value={filtros.tipo} onChange={handleFiltroChange} style={{ padding: '8px' }}>
            <option value="">Todos os Tipos</option> <option value="ASO">ASO</option> <option value="PGR">PGR</option>
            <option value="PCMSO">PCMSO</option> <option value="Certificado">Certificado</option> <option value="Outro">Outro</option>
          </select>
          <select name="colaboradorId" value={filtros.colaboradorId} onChange={handleFiltroChange} style={{ padding: '8px' }}>
            <option value="">Todos os Colaboradores</option>
            {colaboradores.map(col => (<option key={col._id} value={col._id}>{col.nomeCompleto}</option>))}
          </select>
          <button onClick={limparFiltros} style={{ padding: '8px' }}>Limpar Filtros</button>
        </div>

        {/* Tabela de Documentos */}
        {loadingDocs ? (<p>Carregando documentos...</p>) : (
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
              {documentos.length > 0 ? (documentos.map((doc) => (
                <tr key={doc._id}>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{doc.nomeArquivo}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{doc.tipo}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{doc.colaboradorId ? doc.colaboradorId.nomeCompleto : 'Empresa'}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{new Date(doc.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    <a href={`http://localhost:3001/${doc.path.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">Download</a>
                  </td>
                </tr>
              ))) : (
                <tr><td colSpan="5" style={{ padding: '12px', textAlign: 'center' }}>Nenhum documento encontrado para os filtros selecionados.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Documentos;