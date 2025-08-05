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
import banner from "../../assets/treinamentos-banner.jpg"; 

function Trainings() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="trainings-page" style={{
        background: "#f8f8f8"
      }}>
      <div className="trainings-banner">
        <img src={banner} alt="Treinamentos Profissionais" />
      </div>

      <div className="trainings-section" data-aos="fade-up">
        <h2>O que são?</h2>
        <p>
          Os treinamentos em saúde e segurança do trabalho têm como objetivo preparar os profissionais para agir de forma preventiva, cumprindo normas legais e reduzindo riscos nas atividades laborais.
        </p>
      </div>

      <div className="trainings-section" data-aos="fade-up">
        <h2>Benefícios</h2>
        <ul className="trainings-benefits">
          <li><FaUsers /> Equipe mais consciente e engajada</li>
          <li><FaChalkboardTeacher /> Capacitação técnica e prática</li>
          <li><FaRegClipboard /> Redução de acidentes</li>
          <li><FaBookOpen /> Cumprimento das NRs obrigatórias</li>
        </ul>
      </div>

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

      <div className="trainings-cta" data-aos="zoom-in">
        <h2>Capacite sua equipe com a CAMESO</h2>
        <p>Entre em contato e monte um cronograma ideal para sua empresa.</p>
        <a href="https://api.whatsapp.com/send?phone=5581988213512&text=Ol%C3%A1,%20Gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20e%20or%C3%A7amento%20quanto%20a%20parte%20de%20gest%C3%A3o%20em%20SST%20de%20voc%C3%AAs.%20" className="cta-button">Solicitar Treinamento</a>
      </div>
    </section>
  );
}

export default Trainings;