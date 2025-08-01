import React from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp
} from "react-icons/fa";
import "./Contact.css";

function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form[0].value;
    const email = form[1].value;
    const message = form[2].value;

    try {
      const response = await fetch("http://localhost:3001/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        alert("Mensagem enviada com sucesso!");
        form.reset();
      } else {
        alert("Erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro no envio:", error);
      alert("Erro no servidor.");
    }
  };

  return (
    <section className="contact-wrapper" style={{ background: "#f8f8f8" }}>
      <div className="contact-box">
        <div className="contact-left">
          <div className="info-item">
            <FaPhoneAlt className="icon" />
            <div>
              <h4>Ligue para nós</h4>
              <p>(81) 7121-5297</p>
            </div>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h4>Localização</h4>
              <p>R. Eurico Valois, 128, Centro<br />VITÓRIA, PE</p>
              <p>Av. Caxangá, 279, Madalena, Recife<br />RECIFE, PE</p>
            </div>
          </div>

          <div className="info-item">
            <FaClock className="icon" />
            <div>
              <h4>Horário Comercial</h4>
              <p>Seg - Sex: 07h - 17h<br />Sáb: Fechado<br />Dom: Fechado</p>
            </div>
          </div>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="https://www.instagram.com/cameso_clinica_sst/?next=%2F"><FaInstagram /></a>
            <a href="https://br.linkedin.com/company/cameso-assessoria"><FaLinkedinIn /></a>
            <a href="https://www.youtube.com/@camesomedicinaesegurancadotrab/videos"><FaYoutube /></a>
            <a href="https://api.whatsapp.com/send?phone=5581988213512&text=Ol%C3%A1,%20Gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20e%20or%C3%A7amento%20quanto%20a%20parte%20de%20gest%C3%A3o%20em%20SST%20de%20voc%C3%AAs.%20"><FaWhatsapp /></a>
          </div>
        </div>

        <div className="contact-right">
          <h2>Contate-nos</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Seu nome" required />
            <input type="email" placeholder="Seu e-mail" required />
            <textarea placeholder="Sua mensagem" required />
            <button type="submit">ENVIAR</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;