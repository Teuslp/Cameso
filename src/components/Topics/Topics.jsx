import React from "react";
import "./Topics.css";
import icon1 from '../../assets/t1.png';
import icon2 from '../../assets/t2.png';
import icon3 from '../../assets/t3.png';

function Topics() {
    return (
        <div className="container">
            <div className="card">
                <div className="img">
                    <img src={icon1} />
                </div>
                <h3>SAÚDE</h3>
                <hr className="topic-divider" />
                <p>Com um corpo médico qualificado, são realizados exames clínicos e complementares, consultas médicas voltadas
                    à saúde do trabalhador e, também, assessoria para Gestão Ocupacional.</p>
            </div>
            <div className="card">
                <div className="img">
                    <img src={icon2} />
                </div>
                <h3>SEGURANÇA</h3>
                <hr className="topic-divider" />
                <p>Nosso trabalho é feito com foco em evitar acidentes e doenças ocupacionais, através de ações que avaliam e
                    controlam situações de risco, assegurando um ambiente de trabalho saudável e mais seguro.</p>
            </div>
            <div className="card">
                <div className="img">
                    <img src={icon3} />
                </div>
                <h3>TREINAMENTO</h3>
                <hr className="topic-divider" />
                <p>Nossa empresa visa promover o aperfeiçoamento e um melhor desempenho dos nossos clientes, preparando todos os participantes
                    para o exercício de suas funções de forma prevencionista</p>
            </div>
        </div>
    )
}

export default Topics;