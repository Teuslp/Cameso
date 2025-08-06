import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
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
          <img src={logo} alt="Logo CAMESO" onContextMenu={(e) => e.preventDefault()}/>
        </div>

        <ul className="navbar-menu">
          <li><Link to="/">Início</Link></li>
          <li><Link to="/About">Sobre</Link></li>
          <li><Link to="/Esocial">eSocial</Link></li>
          <li className="dropdown">
            <a href="#servicos">Serviços▾</a>
            <ul className="dropdown-menu">
              <li><Link to="/Security" onClick={() => setMenuOpen(false)}>Seg do trabalho</Link></li>
              <li><Link to="/Health" onClick={() => setMenuOpen(false)}>Saúde ocupacional</Link></li>
              <li><Link to="/Trainings" onClick={() => setMenuOpen(false)}>Treinamentos</Link></li>
              <li><Link to="Judicial/" onClick={() => setMenuOpen(false)}>Perícias judiciais</Link></li>
              <li><Link to="/Hygiene" onClick={() => setMenuOpen(false)}>Higiene ocupacional</Link></li>
              <li><Link to="/Consulting" onClick={() => setMenuOpen(false)}>Assessoria e consultoria jurídica</Link></li>
              <li><Link to="/MonthlyConsulting" onClick={() => setMenuOpen(false)}>Assessoria mensal</Link></li>
            </ul>
          </li>
          <li><Link to="/Contact">Contato</Link></li>
        </ul>
      </div>

      {/*MOBILE*/}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="side-menu-header">
          <FaTimes onClick={() => setMenuOpen(false)} className="close-icon" />
        </div>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Início</Link></li>
          <li><Link to="/About" onClick={() => setMenuOpen(false)}>Sobre</Link></li>
          <li><Link to="/Esocial" onClick={() => setMenuOpen(false)}>eSocial</Link></li>
          <li className="mobile-dropdown">
            <div onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-toggle">
              Serviços▾
            </div>
            {dropdownOpen && (
              <ul className="mobile-dropdown-menu">
                <li><Link to="/Security" onClick={() => setMenuOpen(false)}>Seg do trabalho</Link></li>
                <li><Link to="/Health" onClick={() => setMenuOpen(false)}>Saúde ocupacional</Link></li>
                <li><Link to="/Training" onClick={() => setMenuOpen(false)}>Treinamentos</Link></li>
                <li><Link to="/Judicial" onClick={() => setMenuOpen(false)}>Perícias judiciais</Link></li>
                <li><Link to="/Hygiene" onClick={() => setMenuOpen(false)}>Higiene ocupacional</Link></li>
                <li><Link to="/Consulting" onClick={() => setMenuOpen(false)}>Assessoria e consultoria jurídica</Link></li>
                <li><Link to="/MonthlyConsulting" onClick={() => setMenuOpen(false)}>Assessoria mensal</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/Contact" onClick={() => setMenuOpen(false)}>Contato</Link></li>
        </ul>
      </div>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}

export default Navbar;