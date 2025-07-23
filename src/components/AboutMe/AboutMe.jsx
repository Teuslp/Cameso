import React from "react";
import "./AboutMe.css";
import aboutImage from "../../assets/collaborators-image.jpg";

function AboutMe() {
  return (
    <section className="about-section" id="sobre">
      <div className="about-content">
        <div className="about-text">
          <h2>Quem Somos</h2>
          <p>
            2011 marcou o início da nossa missão: cuidar de pessoas com empatia, excelência e compromisso real com a saúde.
            Desde então, transformamos desafios em aprendizado e evoluímos com cada paciente que passou por aqui.
          </p>
          <p>
            Ao longo de mais de uma década, investimos em conhecimento, tecnologia e, principalmente, em pessoas — profissionais dedicados que fazem da CAMESO uma referência em atendimento humanizado.
            Hoje, oferecemos mais do que consultas. Entregamos acolhimento, confiança e cuidado personalizado, em um ambiente que valoriza o bem-estar em cada detalhe.
            <br /><br />
            <strong>CAMESO. Cuidar bem é a nossa essência.</strong>
          </p>
        </div>

        <div className="about-image">
          <img src={aboutImage} alt="Quem somos - CAMESO" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;