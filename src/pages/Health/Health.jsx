import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaStethoscope,
  FaHeartbeat,
  FaUserMd,
  FaNotesMedical,
} from "react-icons/fa";

import "./Health.css";
import banner from "../../assets/saude-banner.jpg"; // troque pela sua imagem real

function Health() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="health-page" style={{
        background: "#f8f8f8"
      }}>
      {/* Banner */}
      <div className="health-banner">
        <img src={banner} alt="Saúde Ocupacional" />
        <h1>Saúde Ocupacional</h1>
      </div>

      {/* Explicação */}
      <div className="health-section" data-aos="fade-up">
        <h2>O que é?</h2>
        <p>
          A saúde ocupacional busca promover a qualidade de vida dos trabalhadores, prevenindo doenças relacionadas ao ambiente de trabalho e garantindo condições adequadas para o exercício de suas funções.
        </p>
      </div>

      {/* Benefícios */}
      <div className="health-section" data-aos="fade-up">
        <h2>Benefícios</h2>
        <ul className="health-benefits">
          <li><FaHeartbeat /> Redução de afastamentos</li>
          <li><FaStethoscope /> Prevenção e diagnóstico precoce</li>
          <li><FaUserMd /> Atendimento especializado</li>
          <li><FaNotesMedical /> Cumprimento das normas legais</li>
        </ul>
      </div>

      {/* Serviços */}
      <div className="health-section" data-aos="fade-up">
        <h2>Serviços Oferecidos</h2>
        <div className="health-cards">
          <div className="health-card">
            <FaUserMd className="icon" />
            <p>Exames Clínicos e Complementares</p>
          </div>
          <div className="health-card">
            <FaNotesMedical className="icon" />
            <p>Emissão de ASO</p>
          </div>
          <div className="health-card">
            <FaStethoscope className="icon" />
            <p>Elaboração e acompanhamento do PCMSO</p>
          </div>
          <div className="health-card">
            <FaHeartbeat className="icon" />
            <p>Atendimento com equipe multidisciplinar</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="health-cta" data-aos="zoom-in">
        <h2>Fale com a CAMESO</h2>
        <p>Estamos prontos para cuidar da saúde da sua equipe com excelência.</p>
        <a href="/contato" className="cta-button">Agende uma avaliação</a>
      </div>
    </section>
  );
}

export default Health;
