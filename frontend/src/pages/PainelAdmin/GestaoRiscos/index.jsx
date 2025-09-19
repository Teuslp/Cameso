import { useState } from "react";
import RiscoList from "./RiscoList";
import RiscoForm from "./RiscoForm";

export default function GestaoRiscos() {
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestão de Riscos</h1>
      <RiscoForm
        selected={selected}
        onSaved={() => {
          setSelected(null);
          setRefresh(!refresh);
        }}
      />
      <RiscoList onEdit={setSelected} key={refresh} />
    </div>
  );
}
