import React from "react";
import "./Navbar.css";
import logo from "../../assets/cameso_logo.png";

function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="logo" />
                </div>
                <ul>
                    <li><a href="">INÍCIO</a></li>
                    <li><a href="">SOBRE</a></li>
                    <li><a href="">ESOCIAL</a></li>
                    <li className="dropdown">
                        <a href="">SERVIÇOS ▾</a>
                        <ul className="dropdown-menu">
                            <li><a href="">Seg do Trabalho</a></li>
                            <li><a href="">Saúde Ocupacional</a></li>
                            <li><a href="">Treinamentos</a></li>
                            <li><a href="">Perícias Judiciais</a></li>
                            <li><a href="">Higiene Ocupacional</a></li>
                            <li><a href="">Assessoria e Consultoria</a></li>
                            <li><a href="">Assessoria Mensal</a></li>
                        </ul>
                    </li>
                    <li><a href="">CONTATO</a></li>
                </ul>
            </nav>
            <hr className="nav-divider" />
        </div>
    );
}

export default Navbar;