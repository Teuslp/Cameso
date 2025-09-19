// frontend/src/pages/PainelAdmin/GestaoRiscos/RiscoList.jsx (ATUALIZADO)
import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function RiscoList({ onEdit }) {
  const [riscos, setRiscos] = useState([]);

  useEffect(() => {
    const fetchRiscos = async () => {
      const res = await api.get("/api/riscos");
      setRiscos(res.data);
    };
    fetchRiscos();
  }, []);

  const deleteRisco = async (id) => {
    if (window.confirm("Deseja realmente excluir este risco?")) {
      await api.delete(`/api/riscos/${id}`);
      setRiscos(riscos.filter(r => r._id !== id));
    }
  };

  return (
    <>
      <h2>Lista de Riscos</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Descrição</th>
            <th style={{width: '200px'}}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {riscos.map((risco) => (
            <tr key={risco._id}>
              <td>{risco.nome}</td>
              <td>{risco.tipo}</td>
              <td>{risco.descricao || '--'}</td>
              <td className="actions-cell">
                <button className="action-btn edit" onClick={() => onEdit(risco)}>
                  Editar
                </button>
                <button className="action-btn delete" onClick={() => deleteRisco(risco._id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}