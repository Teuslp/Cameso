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
  return (
    <section className="contact-wrapper" style={{
        background: "#f8f8f8"
      }}>
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
              <p>Av. Caxangá, 279, Madalena , Recife<br />RECIFE, PE</p>
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
            <a href="https://linkedin.com"><FaWhatsapp /></a>
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
