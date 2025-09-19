// frontend/src/pages/PainelAdmin/GestaoRiscos/index.jsx (ATUALIZADO)
import { useState } from "react";
import RiscoList from "./RiscoList";
import RiscoForm from "./RiscoForm";
import './GestaoRiscos.css'; // Importa nosso novo CSS

export default function GestaoRiscos() {
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Gestão de Riscos</h1>
        <p>Adicione, edite ou remova riscos do catálogo.</p>
      </header>
      
      <RiscoForm
        selected={selected}
        onSaved={() => {
          setSelected(null);
          setRefresh(!refresh);
        }}
      />

      <div className="admin-card">
        <RiscoList onEdit={setSelected} key={refresh} />
      </div>
    </div>
  );
}