import { useEffect, useState } from "react";
import axios from "axios";

export default function RiscoList({ onEdit }) {
  const [riscos, setRiscos] = useState([]);

  const fetchRiscos = async () => {
    const res = await axios.get("/api/riscos"); // rota do backend
    setRiscos(res.data);
  };

  const deleteRisco = async (id) => {
    if (window.confirm("Deseja realmente excluir este risco?")) {
      await axios.delete(`/api/riscos/${id}`);
      fetchRiscos();
    }
  };

  useEffect(() => {
    fetchRiscos();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Lista de Riscos</h2>
      <table className="border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th>Nome</th>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {riscos.map((risco) => (
            <tr key={risco._id}>
              <td>{risco.nome}</td>
              <td>{risco.tipo}</td>
              <td>{risco.descricao}</td>
              <td>
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                  onClick={() => onEdit(risco)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => deleteRisco(risco._id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
