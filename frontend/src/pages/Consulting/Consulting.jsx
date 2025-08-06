import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaClipboardCheck,
  FaFolderOpen,
  FaSearch,
  FaHandshake
} from "react-icons/fa";

import "./Consulting.css";
import banner from "../../assets/consultoria-banner.jpg"; 

function Consulting() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <main className="legal-page">
      <section className="legal-banner">
        <img src={banner} alt="Assessoria Jurídica" />
      </section>

      <section className="legal-section" data-aos="fade-up">
        <h2>O que é Assessoria e Consultoria Jurídica?</h2>
        <p>
          É o serviço prestado por profissionais especializados com o objetivo de orientar, prevenir e
          resolver questões jurídicas trabalhistas, previdenciárias e empresariais de forma estratégica,
          evitando riscos e passivos para a empresa.
        </p>
      </section>

      <section className="legal-section alt-bg" data-aos="fade-up">
        <h2>Áreas de Atuação</h2>
        <div className="legal-cards">
          <div className="legal-card">
            <FaClipboardCheck className="icon" />
            <p>Orientações trabalhistas preventivas</p>
          </div>
          <div className="legal-card">
            <FaFolderOpen className="icon" />
            <p>Defesas administrativas e judiciais</p>
          </div>
          <div className="legal-card">
            <FaSearch className="icon" />
            <p>Análise de contratos e documentos</p>
          </div>
          <div className="legal-card">
            <FaHandshake className="icon" />
            <p>Negociação de acordos e convenções</p>
          </div>
        </div>
      </section>

      <section className="legal-section" data-aos="fade-up">
        <h2>Benefícios para sua empresa</h2>
        <ul className="legal-benefits">
          <li>Redução de riscos jurídicos e passivos trabalhistas</li>
          <li>Tomada de decisões seguras e amparadas na lei</li>
          <li>Maior tranquilidade em fiscalizações e processos</li>
          <li>Melhoria na gestão de contratos e documentos legais</li>
        </ul>
      </section>

      <section className="legal-cta" data-aos="zoom-in">
        <h2>Proteja juridicamente sua empresa com especialistas</h2>
        <p>Solicite uma consultoria personalizada com nossa equipe jurídica.</p>
        <a
          href="https://api.whatsapp.com/send?phone=5581988213512&text=Ol%C3%A1,%20Gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20e%20or%C3%A7amento%20quanto%20a%20parte%20de%20gest%C3%A3o%20em%20SST%20de%20voc%C3%AAs.%20"
          className="cta-button"
        >
          Fale com um especialista
        </a>
      </section>
    </main>
  );
}

export default Consulting;