import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBullseye, FaEye, FaHandsHelping } from "react-icons/fa";
import "./Mission.css";

function Mission() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="mission-section">
      <h2 className="mission-title" data-aos="fade-up">Nossa Essência</h2>

      <div className="mission-block left" data-aos="fade-right">
        <div className="icon-container">
          <FaBullseye className="mission-icon" />
        </div>
        <div className="text-container">
          <h3>Missão</h3>
          <p>Proteger a saúde e o bem-estar dos trabalhadores com responsabilidade e excelência.</p>
        </div>
      </div>

      <div className="mission-block right" data-aos="fade-left">
        <div className="text-container">
          <h3>Visão</h3>
          <p>Ser referência nacional em saúde ocupacional e segurança do trabalho.</p>
        </div>
        <div className="icon-container">
          <FaEye className="mission-icon" />
        </div>
      </div>

      <div className="mission-block left" data-aos="fade-right">
        <div className="icon-container">
          <FaHandsHelping className="mission-icon" />
        </div>
        <div className="text-container">
          <h3>Valores</h3>
          <p>Ética, comprometimento, respeito e foco na prevenção.</p>
        </div>
      </div>
    </section>
  );
}

export default Mission;
