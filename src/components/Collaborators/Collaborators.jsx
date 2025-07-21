import React from "react";
import "./Collaborators.css";
import { motion } from "framer-motion";

function Collaborators() {
  return (
    <section className="collaborators-section">
      <motion.div
        className="collaborators-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2>
          Já são mais de <span>360.000</span><br /> colaboradores impactados
        </h2>
        <p>
          Conectando empresas e pessoas com saúde, segurança e inovação.
        </p>
      </motion.div>
    </section>
  );
}

export default Collaborators;