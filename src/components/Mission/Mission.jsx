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
    <section className="mission-section" data-aos="fade-up">
      <h2 className="mission-title">Nossa Essência</h2>
      <div className="mission-cards">
        <div className="mission-card" data-aos="fade-up" data-aos-delay="100">
          <FaBullseye className="mission-icon" />
          <h3>Missão</h3>
          <p>Proteger a saúde e o bem-estar dos trabalhadores com responsabilidade e excelência.</p>
        </div>

        <div className="mission-card" data-aos="fade-up" data-aos-delay="200">
          <FaEye className="mission-icon" />
          <h3>Visão</h3>
          <p>Ser referência nacional em saúde ocupacional e segurança do trabalho.</p>
        </div>

        <div className="mission-card" data-aos="fade-up" data-aos-delay="300">
          <FaHandsHelping className="mission-icon" />
          <h3>Valores</h3>
          <p>Ética, comprometimento, respeito e foco na prevenção.</p>
        </div>
      </div>
    </section>
  );
}

export default Mission;