// frontend/src/pages/PainelAdmin/GestaoRiscos/RiscoForm.jsx (ATUALIZADO)
import { useState, useEffect } from "react";
import api from "../../../api/axios";

export default function RiscoForm({ selected, onSaved }) {
  const [form, setForm] = useState({ nome: "", tipo: "", descricao: "" });

  useEffect(() => {
    if (selected) {
      setForm({
        nome: selected.nome || "",
        tipo: selected.tipo || "",
        descricao: selected.descricao || "",
      });
    } else {
      setForm({ nome: "", tipo: "", descricao: "" });
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected) {
      await api.put(`/api/riscos/${selected._id}`, form);
    } else {
      await api.post("/api/riscos", form);
    }
    setForm({ nome: "", tipo: "", descricao: "" });
    onSaved();
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <h2 style={{marginBottom: '15px'}}>{selected ? "Editar Risco" : "Cadastrar Novo Risco"}</h2>
        <div className="risco-form-inputs">
            <input
                type="text" name="nome" placeholder="Nome do Risco"
                value={form.nome} onChange={handleChange} required
            />
            <select name="tipo" value={form.tipo} onChange={handleChange} required >
                <option value="">Selecione o tipo</option>
                <option value="Físico">Físico</option>
                <option value="Químico">Químico</option>
                <option value="Biológico">Biológico</option>
                <option value="Ergonômico">Ergonômico</option>
                <option value="De Acidente">De Acidente</option>
            </select>
            <input
                type="text" name="descricao" placeholder="Descrição (Opcional)"
                value={form.descricao} onChange={handleChange}
            />
            <button type="submit">{selected ? "Atualizar" : "Salvar"}</button>
        </div>
      </form>
    </div>
  );
}