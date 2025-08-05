import React from "react";
import "./Hygiene.css";
import banner from "../../assets/higiene-banner.jpg"; 

function Hygiene() {
  return (
    <main className="hygiene-page">
      <section className="hygiene-banner">
        <img src={banner} alt="Higiene Ocupacional" />
      </section>

      <section className="hygiene-section">
        <h2>O que é Higiene Ocupacional?</h2>
        <p>
          A Higiene Ocupacional é responsável pela identificação, avaliação e controle de agentes ambientais
          que possam colocar em risco a saúde dos trabalhadores, como poeiras, ruídos, gases e vibrações.
        </p>
      </section>

      <section className="hygiene-section">
        <h2>Por que é importante?</h2>
        <p>
          Além de prevenir doenças ocupacionais, a Higiene Ocupacional garante o cumprimento das normas
          regulamentadoras e promove um ambiente de trabalho mais seguro, saudável e produtivo.
        </p>
      </section>

      <section className="hygiene-section">
        <h2>Serviços Realizados</h2>
        <div className="hygiene-cards">
          <div className="hygiene-card">
            <div className="icon">🧪</div>
            <p>Coleta e análise de agentes químicos</p>
          </div>
          <div className="hygiene-card">
            <div className="icon">🔊</div>
            <p>Avaliação de ruído ocupacional</p>
          </div>
          <div className="hygiene-card">
            <div className="icon">🌡️</div>
            <p>Medição de calor e conforto térmico</p>
          </div>
          <div className="hygiene-card">
            <div className="icon">📊</div>
            <p>Elaboração de laudos e pareceres técnicos</p>
          </div>
        </div>
      </section>

      <section className="hygiene-section">
        <h2>Benefícios para sua empresa</h2>
        <ul className="hygiene-benefits">
          <li>Redução de riscos à saúde dos trabalhadores</li>
          <li>Atendimento às exigências legais (NRs)</li>
          <li>Melhoria da produtividade e do clima organizacional</li>
          <li>Prevenção de passivos trabalhistas</li>
        </ul>
      </section>

      <section className="hygiene-cta">
        <h2>Quer garantir um ambiente de trabalho seguro e saudável?</h2>
        <p>Entre em contato conosco e solicite uma avaliação de higiene ocupacional.</p>
        <a href="https://api.whatsapp.com/send?phone=5581988213512&text=Ol%C3%A1,%20Gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20e%20or%C3%A7amento%20quanto%20a%20parte%20de%20gest%C3%A3o%20em%20SST%20de%20voc%C3%AAs.%20" className="cta-button">Fale Conosco</a>
      </section>
    </main>
  );
}

export default Hygiene;