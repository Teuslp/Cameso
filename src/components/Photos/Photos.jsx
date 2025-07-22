import React from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Photo.css';

function Photos() {
  return (
    <section className="photo-section">
      <div className="photo-header">
        <h2>EQUIPE CAMESO</h2>
        <p>Veja como nossa equipe atua no dia a dia promovendo saúde, segurança e treinamentos de qualidade.</p>
      </div>

      <div className="photo-carousel-wrapper">
        <Carousel
          autoPlay
          infiniteLoop
          interval={6000}
          transitionTime={1000}
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <button onClick={onClickHandler} className="custom-arrow left">‹</button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <button onClick={onClickHandler} className="custom-arrow right">›</button>
            )
          }
        >
          <div className="photo-card">
            <img src="/photos/trab1.jpeg" alt="Trabalho 1" />
          </div>
          <div className="photo-card">
            <img src="/photos/trab2.jpg" alt="Trabalho 2" />
          </div>
          <div className="photo-card">
            <img src="/photos/trab3.jpg" alt="Trabalho 3" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default Photos;