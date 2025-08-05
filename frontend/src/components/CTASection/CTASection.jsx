import React from "react";
import "./CTASection.css";
import { FaPhoneAlt } from "react-icons/fa";

function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Pronto para cuidar da saúde e segurança da sua empresa?</h2>
        <p>Fale com a nossa equipe e descubra como podemos te ajudar.</p>
        <a href="https://api.whatsapp.com/send?phone=5581988213512&text=Ol%C3%A1,%20Gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20e%20or%C3%A7amento%20quanto%20a%20parte%20de%20gest%C3%A3o%20em%20SST%20de%20voc%C3%AAs.%20" className="cta-button">
          <FaPhoneAlt className="cta-icon" /> Entrar em Contato
        </a>
      </div>
    </section>
  );
}

export default CTASection;