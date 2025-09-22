import React, { useState, useEffect } from 'react';
import api from '../../../api/axios'; // 1. IMPORTAR A INSTÂNCIA 'api'

const Documentos = () => {
  // --- ESTADOS GERAIS ---
  const [colaboradores, setColaboradores] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        // 2. SUBSTITUIR 'fetch' PELA CHAMADA PADRONIZADA COM 'api'
        const response = await api.get('/colaboradores');
        setColaboradores(response.data);
      } catch (err) {
        setError('Não foi possível carregar a lista de colaboradores.');
      }
    };
    fetchColaboradores();
  }, []);

  useEffect(() => {
    const fetchDocumentos = async () => {
      setLoadingDocs(true);
      try {
        // 3. SUBSTITUIR 'fetch' PELA CHAMADA PADRONIZADA COM 'api'
        const response = await api.get('/documentos', { params: filtros });
        setDocumentos(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Falha ao buscar documentos.');
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
      // 4. SUBSTITUIR 'fetch' PELA CHAMADA PADRONIZADA COM 'api'
      await api.post('/documentos/upload', formData);
      
      setStatusUpload({ loading: false, error: null, success: 'Documento enviado com sucesso!' });
      e.target.reset();
      setArquivo(null);
      limparFiltros(); 
      
    } catch (err) {
      setStatusUpload({ loading: false, error: err.response?.data?.message || 'Falha no upload do documento.', success: null });
    }
  };
  
  // 5. URL BASE DINÂMICA PARA DOWNLOADS
  const baseURL = api.defaults.baseURL;

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
        {error && <p style={{color: 'red'}}>Falha ao carregar: {error}</p>}
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
                    {/* 6. LINK DE DOWNLOAD CORRIGIDO E DINÂMICO */}
                    <a href={`${baseURL}/${doc.path.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">Download</a>
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