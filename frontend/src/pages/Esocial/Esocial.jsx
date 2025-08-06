import React from "react";
import {
  FaInfoCircle,
  FaBullseye,
  FaExclamationTriangle,
  FaHandsHelping,
  FaPhoneAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import bannerImage from "../../assets/esocial-banner.png";
import "./Esocial.css";

function Esocial() {
  const topics = [
    {
      icon: <FaInfoCircle className="topic-icon" />,
      title: "O que é o eSocial?",
      text:
        "O eSocial é a plataforma oficial do Governo Federal que revolucionou a forma como as empresas prestam informações trabalhistas, fiscais e previdenciárias. Ele centraliza tudo em um único sistema digital, tornando os processos mais seguros, ágeis e organizados. No módulo de Saúde e Segurança do Trabalho (SST), exige o envio de dados como riscos ocupacionais, condições do ambiente de trabalho, saúde dos colaboradores e ocorrências de acidentes. Estar em conformidade com o eSocial é um passo estratégico para proteger sua empresa e seus trabalhadores.",
      direction: "left",
    },
    {
      icon: <FaBullseye className="topic-icon" />,
      title: "Por que o eSocial existe?",
      text:
        "O eSocial foi criado para substituir processos manuais e desorganizados por um sistema digital inteligente e integrado. Seu objetivo é garantir mais transparência, reduzir a burocracia e fortalecer a fiscalização do cumprimento das obrigações legais. Ao adotar o eSocial, sua empresa demonstra responsabilidade, transmite confiança e fortalece sua reputação no mercado.",
      direction: "right",
    },
    {
      icon: <FaExclamationTriangle className="topic-icon" />,
      title: "E se minha empresa não enviar os dados corretamente?",
      text:
        "A Portaria MTP nº 38/2024 permite que o Governo aplique multas retroativas às empresas que não transmitirem corretamente os eventos de SST. Isso significa que omissões e erros anteriores podem gerar autuações e prejuízos financeiros sérios. Não estar adequado ao eSocial coloca seu negócio em risco jurídico e operacional. Agir agora é a melhor forma de evitar consequências futuras.",
      direction: "left",
    },
    {
      icon: <FaHandsHelping className="topic-icon" />,
      title: "De que forma a CAMESO vai ajudar sua empresa?",
      text:
        "A CAMESO oferece assessoria completa e personalizada na gestão dos eventos de SST no eSocial. Nossa equipe especializada cuida de todo o processo com precisão e agilidade, garantindo que sua empresa esteja sempre em conformidade com a legislação. Com a CAMESO, você evita multas, protege sua equipe e ganha tranquilidade para focar no que realmente importa: o crescimento do seu negócio.",
      direction: "right",
    },
  ];

  return (
    <main className="esocial-page">
      <section
        className="esocial-banner"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="banner-overlay" />
      </section>

      <section className="esocial-full">
        {topics.map((topic, index) => (
          <motion.div
            className={`topic ${topic.direction}`}
            key={index}
            initial={{ opacity: 0, x: topic.direction === "left" ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div className="icon-box">{topic.icon}</div>
            <div className="text-box">
              <h2>{topic.title}</h2>
              <p>{topic.text}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="esocial-cta">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Fale com um de nossos especialistas
        </motion.h2>
        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open("https://api.whatsapp.com/send?phone=5581988213512&text=Ol%C3%A1,%20Gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20e%20or%C3%A7amento%20quanto%20a%20parte%20de%20gest%C3%A3o%20em%20SST%20de%20voc%C3%AAs.%20", "_blank")}
        >
          <FaPhoneAlt className="cta-icon" />
          Entre em contato
        </motion.button>
      </section>
    </main>
  );
}

export default Esocial;