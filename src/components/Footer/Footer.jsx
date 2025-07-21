import React from "react";
import "./Footer.css";
import logo from "../../assets/cameso_logo - Editado.png";
import { FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={logo} alt="Logo CAMESO" />
        </div>

        <div className="footer-right">
          <div className="footer-item">
            <FaPhoneAlt className="footer-icon" />
            <span>(11) 99999-9999</span>
          </div>
          <div className="footer-item">
            <FaEnvelope className="footer-icon" />
            <span>contato@cameso.com.br</span>
          </div>
          <div className="footer-item">
            <FaClock className="footer-icon" />
            <span>Seg a Sex - 07h às 17h</span>
          </div>

          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 CAMESO – Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;