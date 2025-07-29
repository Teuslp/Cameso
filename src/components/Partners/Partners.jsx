import React, { useEffect, useRef } from "react";
import "./Partners.css";

function Partners() {
  const partners = React.useMemo(() => {
    const importAll = (r) => r.keys().map(r);
    return importAll(require.context("../../assets/partnes", false, /\.jpg$/));
  }, []);


  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    let direction = 1;

    const interval = setInterval(() => {
      scrollAmount += direction * 1;
      if (scrollAmount >= maxScrollLeft) direction = -1;
      if (scrollAmount <= 0) direction = 1;
      scrollContainer.scrollLeft = scrollAmount;
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="partners-section">
      <h2 className="partners-title">
        <span className="nosso">Nossos</span> <br />
        Parceiros
      </h2>
      <div className="partners-carousel" ref={scrollRef}>
        {partners.map((partner, index) => (
          <div className="partner-card" key={index}>
            <img src={partner} alt={`Parceiro ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Partners;