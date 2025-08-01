import React from "react";
import "./Channel.css";

function Channel() {
    return (
        <section className="youtube-section">
            <div className="youtube-text">
                <h2>Conheça nosso canal</h2>
                <hr className="youtube-divider" />
                <p>Acompanhe nosso canal e fique por dentro dos eventos que promovemos, parcerias e novas atualizações 
                    e portarias referente a SST.</p>
            </div>

            <div className="youtube-iframe">
                <iframe
                    src="https://www.youtube.com/embed/5gH3sMepQl0?si=Uqgc1nSQElmxys96"
                    title="Vídeo do YouTube"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>
        </section>
    );
}

export default Channel;
