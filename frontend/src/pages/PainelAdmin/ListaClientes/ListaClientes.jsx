import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormNovoCliente from './FormNovoCliente';
import FormEditCliente from './FormEditCliente';
import './ListaClientes.css';
import api from '../../../api/axios';

const PainelAdmin = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modais
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [clienteEmEdicao, setClienteEmEdicao] = useState(null);

  const fetchClientes = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const res = await fetch('/api/admin/clientes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setClientes(data.sort((a, b) => a.razaoSocial.localeCompare(b.razaoSocial)));
    } catch (err) {
      setError("Erro ao carregar clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // Funções de controle
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
        const token = localStorage.getItem('userToken');
        await fetch(`/api/admin/clientes/${clienteId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setClientes(prev => prev.filter(c => c._id !== clienteId));
      } catch (err) {
        setError("Falha ao desativar cliente.");
      }
    }
  };

  // Renderização condicional
  if (loading) {
    return <div className="admin-container">Carregando clientes...</div>;
  }

  if (error) {
    return <div className="admin-container error-message">Erro: {error}</div>;
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
