// frontend/src/pages/PainelAdmin/ListaClientes/ListaClientes.jsx (VERSÃO CORRIGIDA)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormNovoCliente from './FormNovoCliente';
import FormEditCliente from './FormEditCliente';
import './ListaClientes.css';
import api from '../../../api/axios'; // O import já estava correto

const PainelAdmin = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [clienteEmEdicao, setClienteEmEdicao] = useState(null);

  const fetchClientes = async () => {
    try {
      // 1. SUBSTITUIR 'fetch' POR 'api.get'
      const res = await api.get('/admin/clientes');
      setClientes(res.data.sort((a, b) => a.razaoSocial.localeCompare(b.razaoSocial)));
    } catch (err) {
      setError("Erro ao carregar clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleOpenEditModal = (cliente) => {
    setClienteEmEdicao(cliente);
    setIsEditModalOpen(true);
  };

  const handleClienteAdicionado = (novoCliente) => {
    setClientes(prev => 
      [...prev, novoCliente].sort((a, b) => (a.razaoSocial || '').localeCompare(b.razaoSocial || ''))
    );
  };

  const handleClienteAtualizado = (clienteAtualizado) => {
    setClientes(prev => prev.map(c => (c._id === clienteAtualizado._id ? clienteAtualizado : c)));
  };

  const handleClienteDeletado = async (clienteId) => {
    if (window.confirm("Tem certeza que deseja desativar este cliente? Esta ação não pode ser desfeita.")) {
      try {
        // 2. SUBSTITUIR 'fetch' POR 'api.delete'
        await api.delete(`/admin/clientes/${clienteId}`);
        setClientes(prev => prev.filter(c => c._id !== clienteId));
      } catch (err) {
        setError("Falha ao desativar cliente.");
      }
    }
  };

  // O resto do seu código JSX permanece igual
  if (loading) {
    return <div className="admin-container">Carregando clientes...</div>;
  }

  if (error) {
    return <div className="admin-container error-message">{error}</div>;
  }

  return (
    <div className="admin-container">
      {isCreateModalOpen && (
        <FormNovoCliente 
          onClose={() => setIsCreateModalOpen(false)} 
          onClienteAdicionado={handleClienteAdicionado} 
        />
      )}
      {isEditModalOpen && (
        <FormEditCliente 
          onClose={() => setIsEditModalOpen(false)} 
          onClienteAtualizado={handleClienteAtualizado} 
          clienteParaEditar={clienteEmEdicao} 
        />
      )}
      
      <header className="admin-header">
        <div>
          <h1>Painel Administrativo</h1>
          <p>Visão geral e gerenciamento de clientes.</p>
        </div>
        <button className="add-btn" onClick={() => setIsCreateModalOpen(true)}>+ Novo Cliente</button>
      </header>
      
      <div className="admin-card">
        <h2>Lista de Clientes</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Razão Social</th>
              <th>CNPJ</th>
              <th>Contato Principal</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length > 0 ? (
              clientes.map(cliente => (
                <tr key={cliente._id}>
                  <td>{cliente.razaoSocial || '--'}</td>
                  <td>{cliente.cnpj || '--'}</td>
                  <td>{cliente.nome || '--'}</td>
                  <td>{cliente.email || '--'}</td>
                  <td className="actions-cell">
                    <button className="action-btn edit" onClick={() => handleOpenEditModal(cliente)}>Editar</button>
                    <button className="action-btn delete" onClick={() => handleClienteDeletado(cliente._id)}>Excluir</button>
                    <Link to={`/admin/clientes/${cliente._id}`} className="action-btn details">Detalhes</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum cliente encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PainelAdmin;
