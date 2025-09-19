// frontend/src/pages/PainelAdmin/PainelAdmin.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // não esqueça de importar!
import './PainelAdmin.css';

const PainelAdmin = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('/api/admin/clientes', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Falha ao buscar a lista de clientes.');
        }

        const data = await response.json();
        setClientes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (loading) {
    return <div className="admin-container">Carregando clientes...</div>;
  }

  if (error) {
    return <div className="admin-container error-message">Erro: {error}</div>;
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Painel Administrativo</h1>
        <p>Visão geral e gerenciamento de clientes.</p>
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
              clientes.map((cliente) => (
                <tr key={cliente._id}>
                  <td>{cliente.razaoSocial || '--'}</td>
                  <td>{cliente.cnpj || '--'}</td>
                  <td>{cliente.nome || '--'}</td>
                  <td>{cliente.email || '--'}</td>
                  <td>
                    <Link to={`/admin/clientes/${cliente._id}`} className="action-btn">
                      Detalhes
                    </Link>
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
