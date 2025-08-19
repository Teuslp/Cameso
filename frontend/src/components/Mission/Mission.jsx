import React from "react";
import { FaBullseye, FaEye, FaHandsHelping } from "react-icons/fa";
import "./Mission.css";

function Mission() {
  const items = [
    {
      icon: <FaBullseye />,
      title: "Missão",
      text: "Proteger a saúde e o bem-estar dos trabalhadores com responsabilidade e excelência."
    },
    {
      icon: <FaEye />,
      title: "Visão",
      text: "Ser referência nacional em saúde ocupacional e segurança do trabalho."
    },
    {
      icon: <FaHandsHelping />,
      title: "Valores",
      text: "Ética, comprometimento, respeito e foco na prevenção."
    }
  ];

  return (
    <section className="mission-section">
      <h2 className="mission-title">Nossa Essência</h2>
      <div className="mission-grid">
        {items.map((item, index) => (
          <div key={index} className="mission-card">
            <div className="mission-icon-wrapper">{item.icon}</div>
            <div className="mission-text">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Mission;