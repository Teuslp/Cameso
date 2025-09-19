import { useState, useEffect } from "react";
import axios from "axios";

export default function RiscoForm({ selected, onSaved }) {
  const [form, setForm] = useState({ nome: "", tipo: "", descricao: "" });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected) {
      await axios.put(`/api/riscos/${selected._id}`, form);
    } else {
      await axios.post("/api/riscos", form);
    }
    setForm({ nome: "", tipo: "", descricao: "" });
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-xl font-bold mb-2">
        {selected ? "Editar Risco" : "Cadastrar Novo Risco"}
      </h2>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        className="border p-2 mr-2"
        required
      />
      <select
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
        className="border p-2 mr-2"
        required
      >
        <option value="">Selecione o tipo</option>
        <option value="Físico">Físico</option>
        <option value="Químico">Químico</option>
        <option value="Biológico">Biológico</option>
        <option value="Ergonômico">Ergonômico</option>
        <option value="De Acidente">De Acidente</option>
      </select>
      <input
        type="text"
        name="descricao"
        placeholder="Descrição"
        value={form.descricao}
        onChange={handleChange}
        className="border p-2 mr-2"
      />
      <button className="bg-green-500 text-white px-4 py-2">
        {selected ? "Atualizar" : "Salvar"}
      </button>
    </form>
  );
}
