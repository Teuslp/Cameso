import React from "react";
import "./CTASection.css";
import { FaPhoneAlt } from "react-icons/fa";

function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Pronto para cuidar da saúde e segurança da sua empresa?</h2>
        <p>Fale com a nossa equipe e descubra como podemos te ajudar.</p>
        <a href="/Contact" className="cta-button">
          <FaPhoneAlt className="cta-icon" /> Entrar em Contato
        </a>
      </div>
    </section>
  );
}

export default CTASection;