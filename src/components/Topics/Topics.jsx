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
        <p>Com um corpo médico qualificado, são realizados exames clínicos e complementares, consultas médicas voltadas
          à saúde do trabalhador e, também, assessoria para Gestão Ocupacional.</p>
      </div>
      <div className={`card fade-in-up delay-1 ${isVisible ? "visible" : ""}`}>
        <div className="img">
          <img src={icon2} alt="Segurança" />
        </div>
        <h3>SEGURANÇA</h3>
        <hr className="topic-divider" />
        <p>Nosso trabalho é feito com foco em evitar acidentes e doenças ocupacionais, através de ações que avaliam e
          controlam situações de risco, assegurando um ambiente de trabalho saudável e mais seguro.</p>
      </div>
      <div className={`card fade-in-up delay-2 ${isVisible ? "visible" : ""}`}>
        <div className="img">
          <img src={icon3} alt="Treinamento" />
        </div>
        <h3>TREINAMENTO</h3>
        <hr className="topic-divider" />
        <p>Nossa empresa visa promover o aperfeiçoamento e um melhor desempenho dos nossos clientes, preparando todos os participantes
          para o exercício de suas funções de forma prevencionista</p>
      </div>
    </div>
  );
}

export default Topics;
