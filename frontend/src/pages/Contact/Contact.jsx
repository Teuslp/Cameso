import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaUserShield,
  FaBriefcaseMedical,
  FaFileAlt
} from "react-icons/fa";
import "./Contact.css";

function Contact() {
  const [checklist, setChecklist] = useState({
    pcmso: false,
    ppra: false,
    treinamentos: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      employees: form.employees.value,
      sector: form.sector.value,
      service: form.service.value,
      message: form.message.value,
      checklist
    };

    try {
      const response = await fetch("http://localhost:3001/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
        {/* Lado esquerdo - informações */}
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
            <a href="https://api.whatsapp.com/send?phone=5581988213512&text=Olá,%20Gostaria%20de%20informações%20sobre%20os%20serviços%20de%20SST."><FaWhatsapp /></a>
          </div>
        </div>

        {/* Lado direito - formulário */}
        <div className="contact-right">
          <h2>Contate-nos</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Seu nome" required />
            <input type="email" name="email" placeholder="Seu e-mail" required />
            <input type="number" name="employees" placeholder="Nº de colaboradores" required />

            <select name="sector" required>
              <option value="">Setor da empresa</option>
              <option value="industria">Indústria</option>
              <option value="comercio">Comércio</option>
              <option value="servicos">Serviços</option>
            </select>

            <select name="service" required>
              <option value="">Necessidade principal</option>
              <option value="exames">Exames Ocupacionais</option>
              <option value="laudos">Laudos e Programas</option>
              <option value="treinamentos">Treinamentos</option>
              <option value="consultoria">Consultoria Mensal</option>
            </select>

            <textarea name="message" placeholder="Sua mensagem" required />

            {/* Checklist rápido de SST */}
            <div className="checklist">
              <h4><FaUserShield /> Checklist de SST</h4>
              <label>
                <input
                  type="checkbox"
                  checked={checklist.pcmso}
                  onChange={() => setChecklist({ ...checklist, pcmso: !checklist.pcmso })}
                /> Possui PCMSO atualizado
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={checklist.ppra}
                  onChange={() => setChecklist({ ...checklist, ppra: !checklist.ppra })}
                /> Possui PPRA / PGR atualizado
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={checklist.treinamentos}
                  onChange={() => setChecklist({ ...checklist, treinamentos: !checklist.treinamentos })}
                /> Funcionários treinados em NR’s obrigatórias
              </label>
            </div>

            <button type="submit">ENVIAR</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
