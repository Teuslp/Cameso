import React from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import "./Contact.css";

function Contact() {
  return (
    <section className="contact-wrapper">
      <div className="contact-box">
        
        <div className="contact-left">
          <div className="info-item">
            <FaPhoneAlt className="icon" />
            <div>
              <h4>Ligue para nós</h4>
              <p>1 (234) 567-891<br />1 (234) 987-654</p>
            </div>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h4>Localização</h4>
              <p>Rua Exemplo, 123<br />Cidade, UF</p>
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
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        <div className="contact-right">
          <h2>Contate-nos</h2>
          <form>
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
