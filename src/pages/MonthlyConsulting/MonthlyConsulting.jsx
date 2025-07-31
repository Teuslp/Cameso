import React from "react";
import "./MonthlyConsulting.css";
import banner from "../../assets/assessoria-banner.jpg"; // substitua com a imagem real

function MonthlyConsulting() {
  return (
    <main className="monthly-page">
      {/* Banner */}
      <section className="monthly-banner">
        <img src={banner} alt="Assessoria Mensal" />
      </section>

      {/* Introdução */}
      <section className="monthly-section">
        <h2>O que é a Assessoria Mensal?</h2>
        <p>
          A Assessoria Mensal é um serviço contínuo que oferece suporte técnico e especializado às empresas,
          garantindo o cumprimento de obrigações legais nas áreas de saúde, segurança do trabalho e jurídica.
        </p>
      </section>

      {/* Serviços Inclusos */}
      <section className="monthly-section">
        <h2>Serviços Inclusos</h2>
        <div className="monthly-cards">
          <div className="monthly-card">
            <div className="icon">📆</div>
            <p>Acompanhamento periódico de documentos legais</p>
          </div>
          <div className="monthly-card">
            <div className="icon">📝</div>
            <p>Atualização de laudos e programas obrigatórios</p>
          </div>
          <div className="monthly-card">
            <div className="icon">📣</div>
            <p>Notificações sobre mudanças na legislação</p>
          </div>
          <div className="monthly-card">
            <div className="icon">👨‍⚕️</div>
            <p>Suporte técnico nas áreas de saúde e segurança</p>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="monthly-section">
        <h2>Vantagens da Assessoria Mensal</h2>
        <ul className="monthly-benefits">
          <li>Redução de multas e autuações</li>
          <li>Maior organização e controle dos processos</li>
          <li>Economia de tempo e recursos internos</li>
          <li>Previsibilidade e tranquilidade jurídica</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="monthly-cta">
        <h2>Garanta regularidade e tranquilidade para sua empresa</h2>
        <p>Fale com nossos especialistas e solicite sua assessoria mensal personalizada.</p>
        <a href="/Contact" className="cta-button">Solicitar agora</a>
      </section>
    </main>
  );
}

export default MonthlyConsulting;