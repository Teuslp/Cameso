import React from "react";
import "./Consulting.css";
import banner from "../../assets/consultoria-banner.jpg"; // substitua pela imagem real

function Consulting() {
  return (
    <main className="legal-page">
      {/* Banner */}
      <section className="legal-banner">
        <img src={banner} alt="Assessoria Jurídica" />
      </section>

      {/* Introdução */}
      <section className="legal-section">
        <h2>O que é Assessoria e Consultoria Jurídica?</h2>
        <p>
          É o serviço prestado por profissionais especializados com o objetivo de orientar, prevenir e
          resolver questões jurídicas trabalhistas, previdenciárias e empresariais de forma estratégica,
          evitando riscos e passivos para a empresa.
        </p>
      </section>

      {/* Áreas de atuação */}
      <section className="legal-section">
        <h2>Áreas de Atuação</h2>
        <div className="legal-cards">
          <div className="legal-card">
            <div className="icon">📋</div>
            <p>Orientações trabalhistas preventivas</p>
          </div>
          <div className="legal-card">
            <div className="icon">📁</div>
            <p>Defesas administrativas e judiciais</p>
          </div>
          <div className="legal-card">
            <div className="icon">🔍</div>
            <p>Análise de contratos e documentos</p>
          </div>
          <div className="legal-card">
            <div className="icon">🤝</div>
            <p>Negociação de acordos e convenções</p>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="legal-section">
        <h2>Benefícios para sua empresa</h2>
        <ul className="legal-benefits">
          <li>Redução de riscos jurídicos e passivos trabalhistas</li>
          <li>Tomada de decisões seguras e amparadas na lei</li>
          <li>Maior tranquilidade em fiscalizações e processos</li>
          <li>Melhoria na gestão de contratos e documentos legais</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="legal-cta">
        <h2>Proteja juridicamente sua empresa com especialistas</h2>
        <p>Solicite uma consultoria personalizada com nossa equipe jurídica.</p>
        <a href="/Contact" className="cta-button">Fale com um especialista</a>
      </section>
    </main>
  );
}

export default Consulting;
