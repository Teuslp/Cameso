import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import "./Collaborators.css";
import image from "../../assets/collaborators-image.jpg"; 

function Collaborators() {
  return (
    <section className="collaborators-section">
      <motion.div
        className="collaborators-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="collaborators-text">
          <h2 className="collaborators-title">
            Já são mais de{" "}
            <span className="countup-highlight">
              <CountUp
                end={360000}
                duration={3}
                separator="."
                enableScrollSpy
                scrollSpyOnce
              />
            </span>{" "}
            colaboradores atendidos
          </h2>
          <p className="collaborators-subtitle">
            Confiança construída com responsabilidade e cuidado com a saúde.
          </p>
        </div>
        <div className="collaborators-image">
          <img src={image} alt="Colaboradores" />
        </div>
      </motion.div>
    </section>
  );
}

export default Collaborators;
