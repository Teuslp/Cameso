// frontend/src/pages/PainelAdmin/GestaoRiscos/RiscoForm.jsx (VERSÃO MODAL)

import { useState, useEffect } from "react";
import api from "../../../api/axios";

// 1. Recebemos a nova prop 'onClose'
export default function RiscoForm({ selected, onSaved, onClose }) {
  const [form, setForm] = useState({ nome: "", tipo: "", descricao: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditMode = Boolean(selected);

  useEffect(() => {
    if (isEditMode) {
      setForm({
        nome: selected.nome || "",
        tipo: selected.tipo || "",
        descricao: selected.descricao || "",
      });
    } else {
      setForm({ nome: "", tipo: "", descricao: "" });
    }
  }, [selected, isEditMode]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isEditMode) {
        await api.put(`/riscos/${selected._id}`, form);
      } else {
        await api.post("/riscos", form);
      }
      onSaved(); // Avisa o pai que salvou (que vai fechar o modal e atualizar a lista)
    } catch (err) {
      setError(err.response?.data?.message || "Falha ao salvar o risco.");
      setLoading(false);
    }
  };

  // 2. Envolvemos todo o retorno na estrutura do modal
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>{isEditMode ? "Editar Risco" : "Cadastrar Novo Risco"}</h2>
          
          <div className="form-group">
            <label htmlFor="nome">Nome do Risco</label>
            <input id="nome" type="text" name="nome" value={form.nome} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="tipo">Tipo</label>
            <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange} required>
              <option value="">Selecione o tipo</option>
              <option value="Físico">Físico</option>
              <option value="Químico">Químico</option>
              <option value="Biológico">Biológico</option>
              <option value="Ergonômico">Ergonômico</option>
              <option value="De Acidente">De Acidente</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição (Opcional)</label>
            <textarea id="descricao" name="descricao" rows="3" value={form.descricao} onChange={handleChange}></textarea>
          </div>

          {error && <p className="error-message">{error}</p>}

          {/* 3. Adicionamos os botões de ação, incluindo o "Cancelar" */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Salvando...' : (isEditMode ? "Atualizar Risco" : "Salvar Risco")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}