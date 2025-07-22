import React, { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./BannerCarousel.css";

function BannerCarousel() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const banners = isMobile
    ? ["/banners/banner1-mobile.jpg", "/banners/banner2-mobile.jpg"]
    : ["/banners/banner1.jpg", "/banners/banner2.jpg"];

  return (
    <div className="banner-container">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        showIndicators={false}
        interval={7000}
        transitionTime={1200}
      >
        {banners.map((src, index) => (
          <div key={index}>
            <img src={src} alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default BannerCarousel;
