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
        "O eSocial é um sistema do Governo Federal que centraliza todas as informações trabalhistas, fiscais e previdenciárias da sua empresa. Ele foi criado para reduzir burocracias, mas também exige muita atenção, pois qualquer erro pode gerar multas e complicações legais. Em outras palavras, sua empresa precisa estar preparada para atender às exigências do eSocial e evitar riscos desnecessários.",
      direction: "left",
    },
    {
      icon: <FaBullseye className="topic-icon" />,
      title: "Por que o eSocial existe?",
      text:
        "O eSocial tem como objetivo organizar e padronizar o envio dos dados legais das empresas, permitindo que o governo acompanhe em tempo real o cumprimento das obrigações trabalhistas. Para você, empresário, isso significa que é fundamental manter tudo em dia para evitar penalidades e garantir a segurança jurídica do seu negócio.",
      direction: "right",
    },
    {
      icon: <FaExclamationTriangle className="topic-icon" />,
      title: "E se minha empresa não enviar os dados corretamente?",
      text:
        "O envio incorreto, atrasado ou incompleto das informações ao eSocial pode resultar em multas elevadas, fiscalizações inesperadas e prejuízos à reputação da sua empresa. Esses riscos comprometem a estabilidade do seu negócio e podem gerar consequências financeiras e legais significativas. Você não precisa enfrentar essa situação sozinho.",
      direction: "left",
    },
    {
      icon: <FaHandsHelping className="topic-icon" />,
      title: "De que forma a CAMESO vai ajudar sua empresa?",
      text:
        "Na CAMESO, você conta com uma equipe especializada em eSocial que cuida de todo o processo para garantir que sua empresa esteja 100% em conformidade. Oferecemos gestão completa dos seus dados, consultoria personalizada e treinamentos práticos para sua equipe, além de acompanhamento contínuo para que nada seja deixado de lado. Com a CAMESO, você evita problemas, cumpre a legislação e ainda otimiza seus processos internos.",
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
          Pronto para garantir a conformidade com o eSocial?
        </motion.h2>
        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (window.location.href = "/Contact")}
        >
          <FaPhoneAlt className="cta-icon" />
          Entre em contato
        </motion.button>
      </section>
    </main>
  );
}

export default Esocial;
