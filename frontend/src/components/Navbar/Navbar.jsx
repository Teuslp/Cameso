import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/cameso_logo.png";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);         // side menu (mobile)
  const [dropdownOpen, setDropdownOpen] = useState(false); // serviços (mobile)
  const [userMenuOpen, setUserMenuOpen] = useState(false); // menu do usuário (desktop)
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // usuário atual (lido do localStorage a cada render)
  const user = JSON.parse(localStorage.getItem("user"));

  // fecha o menu do usuário ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate("/"); // volta à home
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Ícone mobile (abre side-menu) */}
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
          <FaBars />
        </div>

        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img
              src={logo}
              alt="Logo CAMESO"
              onContextMenu={(e) => e.preventDefault()}
            />
          </Link>
        </div>

        {/* Menu desktop */}
        <ul className="navbar-menu">
          <li><Link to="/">Início</Link></li>
          <li><Link to="/About">Sobre</Link></li>
          <li><Link to="/Esocial">eSocial</Link></li>

          <li className="dropdown">
            <a href="#servicos">Serviços▾</a>
            <ul className="dropdown-menu">
              <li><Link to="/Security">Seg do trabalho</Link></li>
              <li><Link to="/Health">Saúde ocupacional</Link></li>
              <li><Link to="/Trainings">Treinamentos</Link></li>
              <li><Link to="/Judicial">Perícias judiciais</Link></li>
              <li><Link to="/Hygiene">Higiene ocupacional</Link></li>
              <li><Link to="/Consulting">Assessoria e consultoria jurídica</Link></li>
              <li><Link to="/MonthlyConsulting">Assessoria mensal</Link></li>
            </ul>
          </li>

          <li><Link to="/Contact">Contato</Link></li>

          {/* Autenticação (desktop) */}
          {user ? (
            <li className="user-dropdown" ref={userMenuRef}>
              <FaUserCircle
                size={22}
                className="user-icon"
                onClick={() => setUserMenuOpen((v) => !v)}
              />
              <ul className={`user-menu ${userMenuOpen ? "show" : ""}`}>
                <li>
                  <Link
                    to={user.role === "admin" ? "/admin" : "/cliente"}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Meu Painel
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>
              </ul>
            </li>
          ) : (
            <li><Link to="/Login">Entrar</Link></li>
          )}
        </ul>
      </div>

      {/* Side-menu (mobile) */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="side-menu-header">
          <FaTimes onClick={() => setMenuOpen(false)} className="close-icon" />
        </div>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Início</Link></li>
          <li><Link to="/About" onClick={() => setMenuOpen(false)}>Sobre</Link></li>
          <li><Link to="/Esocial" onClick={() => setMenuOpen(false)}>eSocial</Link></li>

          <li className="mobile-dropdown">
            <div
              onClick={() => setDropdownOpen((v) => !v)}
              className="dropdown-toggle"
            >
              Serviços▾
            </div>
            {dropdownOpen && (
              <ul className="mobile-dropdown-menu">
                <li><Link to="/Security" onClick={() => setMenuOpen(false)}>Seg do trabalho</Link></li>
                <li><Link to="/Health" onClick={() => setMenuOpen(false)}>Saúde ocupacional</Link></li>
                <li><Link to="/Trainings" onClick={() => setMenuOpen(false)}>Treinamentos</Link></li>
                <li><Link to="/Judicial" onClick={() => setMenuOpen(false)}>Perícias judiciais</Link></li>
                <li><Link to="/Hygiene" onClick={() => setMenuOpen(false)}>Higiene ocupacional</Link></li>
                <li><Link to="/Consulting" onClick={() => setMenuOpen(false)}>Assessoria e consultoria jurídica</Link></li>
                <li><Link to="/MonthlyConsulting" onClick={() => setMenuOpen(false)}>Assessoria mensal</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/Contact" onClick={() => setMenuOpen(false)}>Contato</Link></li>

          {user ? (
            <>
              <li>
                <Link
                  to={user.role === "admin" ? "/admin" : "/cliente"}
                  onClick={() => setMenuOpen(false)}
                >
                  Meu Painel
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Sair</button>
              </li>
            </>
          ) : (
            <li><Link to="/Login" onClick={() => setMenuOpen(false)}>Entrar</Link></li>
          )}
        </ul>
      </div>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}

export default Navbar;
