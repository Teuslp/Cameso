import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/cameso_logo.png";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
          <FaBars />
        </div>

        <div className="navbar-logo">
          <img src={logo} alt="Logo CAMESO" />
        </div>

        <ul className="navbar-menu">
          <li><a href="#inicio">INÍCIO</a></li>
          <li><a href="#sobre">SOBRE</a></li>
          <li><a href="#esocial">ESOCIAL</a></li>
          <li className="dropdown">
            <a href="#servicos">SERVIÇOS ▾</a>
            <ul className="dropdown-menu">
              <li><a href="#">Seg do Trabalho</a></li>
              <li><a href="#">Saúde Ocupacional</a></li>
              <li><a href="#">Treinamentos</a></li>
              <li><a href="#">Perícias Judiciais</a></li>
            </ul>
          </li>
          <li><a href="#contato">CONTATO</a></li>
        </ul>
      </div>

      {/* MENU MOBILE LATERAL */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="side-menu-header">
          <FaTimes onClick={() => setMenuOpen(false)} className="close-icon" />
        </div>
        <ul>
          <li><a href="#inicio" onClick={() => setMenuOpen(false)}>INÍCIO</a></li>
          <li><a href="#sobre" onClick={() => setMenuOpen(false)}>SOBRE</a></li>
          <li><a href="#esocial" onClick={() => setMenuOpen(false)}>ESOCIAL</a></li>
          <li className="mobile-dropdown">
            <div onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-toggle">
              SERVIÇOS ▾
            </div>
            {dropdownOpen && (
              <ul className="mobile-dropdown-menu">
                <li><a href="#" onClick={() => setMenuOpen(false)}>Seg do Trabalho</a></li>
                <li><a href="#" onClick={() => setMenuOpen(false)}>Saúde Ocupacional</a></li>
                <li><a href="#" onClick={() => setMenuOpen(false)}>Treinamentos</a></li>
                <li><a href="#" onClick={() => setMenuOpen(false)}>Perícias Judiciais</a></li>
              </ul>
            )}
          </li>
          <li><a href="#contato" onClick={() => setMenuOpen(false)}>CONTATO</a></li>
        </ul>
      </div>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}

export default Navbar;
