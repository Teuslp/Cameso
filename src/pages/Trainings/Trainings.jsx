import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaRegClipboard,
  FaBookOpen
} from "react-icons/fa";

import "./Trainings.css";
import banner from "../../assets/treinamentos-banner.jpg"; // insira sua imagem de banner

function Trainings() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="trainings-page" style={{
        background: "#f8f8f8"
      }}>
      {/* Banner */}
      <div className="trainings-banner">
        <img src={banner} alt="Treinamentos Profissionais" />
        <h1>Treinamentos</h1>
      </div>

      {/* Explicação */}
      <div className="trainings-section" data-aos="fade-up">
        <h2>O que são?</h2>
        <p>
          Os treinamentos em saúde e segurança do trabalho têm como objetivo preparar os profissionais para agir de forma preventiva, cumprindo normas legais e reduzindo riscos nas atividades laborais.
        </p>
      </div>

      {/* Benefícios */}
      <div className="trainings-section" data-aos="fade-up">
        <h2>Benefícios</h2>
        <ul className="trainings-benefits">
          <li><FaUsers /> Equipe mais consciente e engajada</li>
          <li><FaChalkboardTeacher /> Capacitação técnica e prática</li>
          <li><FaRegClipboard /> Redução de acidentes</li>
          <li><FaBookOpen /> Cumprimento das NRs obrigatórias</li>
        </ul>
      </div>

      {/* Serviços */}
      <div className="trainings-section" data-aos="fade-up">
        <h2>Treinamentos Oferecidos</h2>
        <div className="trainings-cards">
          <div className="trainings-card">
            <FaBookOpen className="icon" />
            <p>NR-6: Equipamentos de Proteção Individual</p>
          </div>
          <div className="trainings-card">
            <FaRegClipboard className="icon" />
            <p>NR-35: Trabalho em Altura</p>
          </div>
          <div className="trainings-card">
            <FaUsers className="icon" />
            <p>NR-10: Segurança em Instalações Elétricas</p>
          </div>
          <div className="trainings-card">
            <FaChalkboardTeacher className="icon" />
            <p>Treinamentos personalizados conforme sua atividade</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="trainings-cta" data-aos="zoom-in">
        <h2>Capacite sua equipe com a CAMESO</h2>
        <p>Entre em contato e monte um cronograma ideal para sua empresa.</p>
        <a href="/contato" className="cta-button">Solicitar Treinamento</a>
      </div>
    </section>
  );
}

export default Trainings;