import React from "react";
import "./Judicial.css";
import banner from "../../assets/pericias-banner.jpg"; 

function Judicial() {
  return (
    <main className="judicial-page">
      <section className="judicial-banner" style={{ backgroundImage: `url(${banner})` }}>
        <div className="overlay">
          <h1>Perícias Judiciais Trabalhistas</h1>
        </div>
      </section>

      <section className="judicial-section">
        <h2>O que são Perícias Judiciais?</h2>
        <p>
          As perícias judiciais trabalhistas são procedimentos técnicos determinados por juízes para esclarecer fatos relevantes em processos. Elas envolvem avaliações, análises e laudos elaborados por peritos especializados, que servem como prova técnica no processo.
        </p>
      </section>

      <section className="judicial-section alt-bg">
        <h2>Quem pode solicitar?</h2>
        <ul>
          <li>Juízes do Trabalho</li>
          <li>Advogados das partes (por meio de assistentes técnicos)</li>
          <li>Ministério Público do Trabalho</li>
        </ul>
      </section>

      <section className="judicial-section">
        <h2>Tipos de Perícias Realizadas</h2>
        <div className="expertise-grid">
          <div className="card">Insalubridade</div>
          <div className="card">Periculosidade</div>
          <div className="card">Acidente de trabalho</div>
          <div className="card">Condições de ambiente laboral</div>
          <div className="card">Ergonomia</div>
          <div className="card">Análise documental</div>
        </div>
      </section>

      <section className="judicial-section alt-bg">
        <h2>Por que escolher a CAMESO?</h2>
        <ul className="benefits-list">
          <li>Equipe qualificada e experiente</li>
          <li>Imparcialidade e ética profissional</li>
          <li>Laudos claros, técnicos e fundamentados</li>
          <li>Atendimento em todo o território nacional</li>
        </ul>
      </section>

      <section className="judicial-cta">
        <h2>Precisa de uma Perícia Judicial Técnica e Confiável?</h2>
        <p>Entre em contato conosco e solicite um orçamento personalizado.</p>
        <a href="/Contact" className="cta-button">Solicitar Perícia</a>
      </section>
    </main>
  );
}

export default Judicial;
