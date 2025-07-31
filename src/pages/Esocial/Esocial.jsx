// src/pages/Esocial.jsx
import React from "react";
import "./Esocial.css";

import { FaInfoCircle, FaExclamationTriangle, FaHandsHelping, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import bannerImage from "../../assets/esocial-banner.png";

function Esocial() {
  return (
    <main className="esocial-page" style={{
        background: "#f8f8f8"
      }}>

      <section className="esocial-banner"
        style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className="banner-overlay" />
        <motion.h1
          className="banner-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
        </motion.h1>
      </section>

      <section className="esocial-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaInfoCircle className="section-icon" />
          O que é o eSocial
          <div className="title-underline" />
        </motion.h2>
        <motion.p
          className="section-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          O eSocial é um sistema do governo federal que unifica o envio de informações trabalhistas, fiscais e previdenciárias das empresas, simplificando a burocracia e aumentando a transparência.
        </motion.p>
      </section>

      <section className="esocial-section bg-light">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaExclamationTriangle className="section-icon" />
          Obrigatoriedade e Impactos
          <div className="title-underline" />
        </motion.h2>
        <motion.p
          className="section-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Todas as empresas devem enviar informações ao eSocial, sob pena de multas e penalidades. Isso impacta diretamente a gestão de saúde e segurança do trabalho, exigindo controle rigoroso e conformidade.
        </motion.p>
      </section>

      <section className="esocial-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaHandsHelping className="section-icon" />
          Como a CAMESO pode ajudar
          <div className="title-underline" />
        </motion.h2>

        <div className="cards-container">

          <motion.div
            className="esocial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3>Gestão Completa</h3>
            <p>Monitoramos e gerenciamos todos os dados relacionados ao eSocial para garantir conformidade e segurança jurídica.</p>
          </motion.div>

          <motion.div
            className="esocial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3>Consultoria Especializada</h3>
            <p>Equipe especializada orienta sobre obrigações e melhores práticas para evitar multas e sanções.</p>
          </motion.div>

          <motion.div
            className="esocial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3>Treinamentos e Capacitação</h3>
            <p>Oferecemos treinamentos para sua equipe se adequar às novas exigências do eSocial com eficiência.</p>
          </motion.div>

        </div>
      </section>

      <section className="esocial-cta">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Pronto para garantir a conformidade com o eSocial?
        </motion.h2>
        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = "/Contact"}
        >
          <FaPhoneAlt className="cta-icon" />Entre em contato
        </motion.button>
      </section>

    </main>
  );
}

export default Esocial;
