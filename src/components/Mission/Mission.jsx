import React, { useEffect, useRef, useState } from "react";
import { FaBullseye, FaEye, FaHandsHelping } from "react-icons/fa";
import "./Mission.css";

function Mission() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`mission-section ${visible ? "visible" : ""}`}
      ref={sectionRef}
    >
      <h2 className="mission-title">Nossa Essência</h2>
      <div className="mission-cards">
        <div className="mission-card">
          <FaBullseye className="mission-icon" />
          <h3>Missão</h3>
          <p>Proteger a saúde e o bem-estar dos trabalhadores com responsabilidade e excelência.</p>
        </div>

        <div className="mission-card">
          <FaEye className="mission-icon" />
          <h3>Visão</h3>
          <p>Ser referência nacional em saúde ocupacional e segurança do trabalho.</p>
        </div>

        <div className="mission-card">
          <FaHandsHelping className="mission-icon" />
          <h3>Valores</h3>
          <p>Ética, comprometimento, respeito e foco na prevenção.</p>
        </div>
      </div>
    </section>
  );
}

export default Mission;
