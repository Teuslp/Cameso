import React from "react";
import "./Contact.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo from "../../assets/logoc.png";
import banner from "../../assets/contact-banner.jpg"; 

function Contato() {
  return (
    <section className="contato">
      {/* Banner topo */}
      <div className="contato-banner">
        <img src={banner} alt="Banner Contato" />
        <h1>Contato</h1>
      </div>

      {/* Formulário e logo */}
      <div className="contato-wrapper">
        <div className="contato-logo">
          <img src={logo} alt="Logo CAMESO" />
        </div>

        <form className="contato-form">
          <h2>Fale Conosco</h2>
          <input type="text" placeholder="Nome" required />
          <input type="email" placeholder="E-mail" required />
          <textarea placeholder="Mensagem" required></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>

      {/* Redes sociais */}
      <div className="contato-social">
        <h3>Nos acompanhe:</h3>
        <div className="social-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaYoutube /></a>
        </div>
      </div>
    </section>
  );
}

export default Contato;
