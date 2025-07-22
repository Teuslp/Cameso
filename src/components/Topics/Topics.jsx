import React, { useEffect, useRef, useState } from "react";
import "./Topics.css";
import icon1 from '../../assets/t1.png';
import icon2 from '../../assets/t2.png';
import icon3 from '../../assets/t3.png';

function Topics() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // desliga o observer após a primeira vez
        }
      },
      { threshold: 0.3 } // 30% visível para ativar
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <div className={`card fade-in-up ${isVisible ? "visible" : ""}`}>
        <div className="img">
          <img src={icon1} alt="Saúde" />
        </div>
        <h3>SAÚDE</h3>
        <hr className="topic-divider" />
        <p>Exames, consultas e assessoria em saúde do trabalhador com equipe médica especializada.</p>
      </div>
      <div className={`card fade-in-up delay-1 ${isVisible ? "visible" : ""}`}>
        <div className="img">
          <img src={icon2} alt="Segurança" />
        </div>
        <h3>SEGURANÇA</h3>
        <hr className="topic-divider" />
        <p>Atuamos na prevenção de acidentes e doenças ocupacionais, promovendo um ambiente de trabalho mais seguro e saudável.</p>
      </div>
      <div className={`card fade-in-up delay-2 ${isVisible ? "visible" : ""}`}>
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
