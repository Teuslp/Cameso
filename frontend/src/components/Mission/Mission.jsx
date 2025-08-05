import React from "react";
import { FaBullseye, FaEye, FaHandsHelping } from "react-icons/fa";
import "./Mission.css";

function Mission() {
  return (
    <section className="mission-section">
      <h2 className="mission-title">Nossa Essência</h2>

      <div className="mission-item left">
        <div className="mission-icon-wrapper">
          <FaBullseye className="mission-icon" />
        </div>
        <div className="mission-text">
          <h3>Missão</h3>
          <p>
            Proteger a saúde e o bem-estar dos trabalhadores com responsabilidade e excelência.
          </p>
        </div>
      </div>

      <div className="mission-item right">
        <div className="mission-icon-wrapper">
          <FaEye className="mission-icon" />
        </div>
        <div className="mission-text">
          <h3>Visão</h3>
          <p>
            Ser referência nacional em saúde ocupacional e segurança do trabalho.
          </p>
        </div>
      </div>

      <div className="mission-item left">
        <div className="mission-icon-wrapper">
          <FaHandsHelping className="mission-icon" />
        </div>
        <div className="mission-text">
          <h3>Valores</h3>
          <p>
            Ética, comprometimento, respeito e foco na prevenção.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Mission;
