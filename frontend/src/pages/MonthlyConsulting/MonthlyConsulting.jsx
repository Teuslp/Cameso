import React from "react";
import {
  FaRegCalendarCheck,
  FaFileAlt,
  FaBullhorn,
  FaUserMd
} from "react-icons/fa";

import "./MonthlyConsulting.css";
import banner from "../../assets/assessoria-banner.jpg";

function MonthlyConsulting() {
  return (
    <main className="monthly-page">
      <section className="monthly-banner">
        <img src={banner} alt="Assessoria Mensal" />
      </section>

      <section className="monthly-section">
        <h2>O que é a Assessoria Mensal?</h2>
        <p>
          A Assessoria Mensal é um serviço contínuo que oferece suporte técnico e especializado às empresas,
          garantindo o cumprimento de obrigações legais nas áreas de saúde, segurança do trabalho e jurídica.
        </p>
      </section>

      <section className="monthly-section">
        <h2>Serviços Inclusos</h2>
        <div className="monthly-cards">
          <div className="monthly-card">
            <FaRegCalendarCheck className="icon" />
            <p>Acompanhamento periódico de documentos legais</p>
          </div>
          <div className="monthly-card">
            <FaFileAlt className="icon" />
            <p>Atualização de laudos e programas obrigatórios</p>
          </div>
          <div className="monthly-card">
            <FaBullhorn className="icon" />
            <p>Notificações sobre mudanças na legislação</p>
          </div>
          <div className="monthly-card">
            <FaUserMd className="icon" />
            <p>Suporte técnico nas áreas de saúde e segurança</p>
          </div>
        </div>
      </section>

      <section className="monthly-section">
        <h2>Vantagens da Assessoria Mensal</h2>
        <ul className="monthly-benefits">
          <li>Redução de multas e autuações</li>
          <li>Maior organização e controle dos processos</li>
          <li>Economia de tempo e recursos internos</li>
          <li>Previsibilidade e tranquilidade jurídica</li>
        </ul>
      </section>

      <section className="monthly-cta">
        <h2>Garanta regularidade e tranquilidade para sua empresa</h2>
        <p>Fale com nossos especialistas e solicite sua assessoria mensal personalizada.</p>
        <a
          href="https://api.whatsapp.com/send?phone=5581988213512&text=Ol%C3%A1,%20Gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20e%20or%C3%A7amento%20quanto%20a%20parte%20de%20gest%C3%A3o%20em%20SST%20de%20voc%C3%AAs.%20"
          className="cta-button"
        >
          Solicitar agora
        </a>
      </section>
    </main>
  );
}

export default MonthlyConsulting;
