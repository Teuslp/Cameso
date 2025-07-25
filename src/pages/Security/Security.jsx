import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaHardHat, FaChalkboardTeacher, FaExclamationTriangle, FaMapSigns } from "react-icons/fa";
import "./Security.css";
import banner from "../../assets/seguranca-banner.jpg";

function SecurityPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="security-page">
      {/* Banner */}
      <div className="security-banner">
        <img src={banner} alt="Segurança do Trabalho" />
        <h1>Segurança do Trabalho</h1>
      </div>

      {/* Explicação */}
      <div className="security-section" data-aos="fade-up">
        <h2>O que é?</h2>
        <p>
          A segurança do trabalho tem como objetivo prevenir acidentes e doenças ocupacionais, promovendo um ambiente de trabalho mais seguro e eficiente.
        </p>
      </div>

      {/* Benefícios */}
      <div className="security-section" data-aos="fade-up">
        <h2>Benefícios</h2>
        <ul className="security-benefits">
          <li><FaHardHat /> Redução de acidentes</li>
          <li><FaExclamationTriangle /> Cumprimento da legislação</li>
          <li><FaChalkboardTeacher /> Aumento da produtividade</li>
          <li><FaMapSigns /> Ambiente mais organizado</li>
        </ul>
      </div>

      {/* Serviços */}
      <div className="security-section" data-aos="fade-up">
        <h2>Serviços Oferecidos</h2>
        <div className="security-cards">
          <div className="security-card">
            <FaHardHat className="icon" />
            <p>Fornecimento de EPI</p>
          </div>
          <div className="security-card">
            <FaChalkboardTeacher className="icon" />
            <p>Treinamentos de Segurança</p>
          </div>
          <div className="security-card">
            <FaExclamationTriangle className="icon" />
            <p>Programa de Prevenção de Riscos</p>
          </div>
          <div className="security-card">
            <FaMapSigns className="icon" />
            <p>Sinalização e Orientação</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="security-cta" data-aos="zoom-in">
        <h2>Fale com a CAMESO</h2>
        <p>Vamos juntos garantir mais segurança para sua empresa.</p>
        <a href="/contato" className="cta-button">Entrar em Contato</a>
      </div>
    </section>
  );
}

export default SecurityPage;
