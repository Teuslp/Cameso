import React from "react";
import logo from "../../assets/cameso_logo.png";
import {
  FaHardHat,
  FaHeartbeat,
  FaTooth,
  FaChalkboardTeacher,
  FaBalanceScale,
  FaSearch
} from "react-icons/fa";
import "./AreasActivity.css";

const areas = [
  { id: 1, name: "Segurança do Trabalho", icon: <FaHardHat /> },
  { id: 2, name: "Saúde Ocupacional", icon: <FaHeartbeat /> },
  { id: 3, name: "Higiene Ocupacional", icon: <FaTooth /> },
  { id: 4, name: "Treinamentos", icon: <FaChalkboardTeacher /> },
  { id: 5, name: "Consultoria Jurídica", icon: <FaBalanceScale /> },
  { id: 6, name: "Assistência em Perícias", icon: <FaSearch /> }
];

export default function AreasActivity() {
  return (
    <section className="areas-section">
      <img src={logo} alt="Logo CAMESO" className="areas-logo" />
      <div className="areas-container">
        {areas.map((area) => (
          <div className="area-card" key={area.id}>
            <div className="icon">{area.icon}</div>
            <p>{area.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
