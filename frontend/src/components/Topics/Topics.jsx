import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Topics.css";
import icon1 from '../../assets/t1.png';
import icon2 from '../../assets/t2.png';
import icon3 from '../../assets/t3.png';

function Topics() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="container">
      <div className="card" data-aos="fade-up" data-aos-delay="0" data-aos-offset="200">
        <div className="img">
          <img src={icon1} alt="Saúde" />
        </div>
        <h3>SAÚDE</h3>
        <hr className="topic-divider" />
        <p>Exames, consultas e assessoria em saúde do trabalhador com equipe médica especializada.</p>
      </div>

      <div className="card" data-aos="fade-up" data-aos-delay="0" data-aos-offset="200">
        <div className="img">
          <img src={icon2} alt="Segurança" />
        </div>
        <h3>SEGURANÇA</h3>
        <hr className="topic-divider" />
        <p>Atuamos na prevenção de acidentes e doenças ocupacionais, promovendo um ambiente de trabalho mais seguro e saudável.</p>
      </div>

      <div className="card" data-aos="fade-up" data-aos-delay="0" data-aos-offset="200">
        <div className="img">
          <img src={icon3} alt="Treinamento" />
        </div>
        <h3>TREINAMENTO</h3>
        <hr className="topic-divider" />
        <p>Nossa empresa promove o aperfeiçoamento e prepara os clientes para desempenhar suas funções com foco na prevenção.</p>
      </div>
    </div>
  );
}

export default Topics;