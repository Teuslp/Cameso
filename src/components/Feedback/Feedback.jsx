import React from "react";
import "./Feedback.css";
import { FaStar } from "react-icons/fa";

const feedbacks = [
  {
    name: "Marcos Oliveira",
    role: "Gerente de RH",
    stars: 5,
    date: "Julho de 2025",
    comment:
      "A CAMESO tem sido uma parceira essencial na capacitação da nossa equipe. Atendimento ágil e treinamentos de qualidade.",
  },
  {
    name: "Fernanda Lima",
    role: "Técnica de Segurança",
    stars: 5,
    date: "Junho de 2025",
    comment:
      "Conseguimos reduzir acidentes após os treinamentos. Tudo muito organizado e prático.",
  },
  {
    name: "Carlos Silva",
    role: "Supervisor Operacional",
    stars: 4,
    date: "Maio de 2025",
    comment:
      "Os conteúdos são claros e os certificados são aceitos sem problemas. Parabéns pelo profissionalismo!",
  },
];

function Feedback() {
  return (
    <section className="feedback-section" data-aos="fade-up" id="feedback">
      <h2 className="feedback-title">O que nossos clientes dizem</h2>
      <div className="feedback-cards">
        {feedbacks.map((feedback, index) => (
          <div className="feedback-card" key={index}>
            <p className="comment">“{feedback.comment}”</p>
            <div className="stars">
              {Array(feedback.stars)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} color="#45BF4D" />
                ))}
            </div>
            <div className="author">
              <strong>{feedback.name}</strong>
              <span>{feedback.role}</span>
              <small>{feedback.date}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Feedback;
