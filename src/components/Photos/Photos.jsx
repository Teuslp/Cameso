import React from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Photo.css';

function Photos() {
  return (
    <div className="photo-container">
      <Carousel
        autoPlay
        infiniteLoop
        interval={7000}
        transitionTime={1000}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button onClick={onClickHandler} className="custom-arrow left">
              ‹
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button onClick={onClickHandler} className="custom-arrow right">
              ›
            </button>
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
  );
}

export default Photos;
