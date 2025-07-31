import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./BannerCarousel.css";

function BannerCarousel() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const banners = isMobile
    ? ["/banners/banner1-mobile.jpg", "/banners/banner2-mobile.jpg"]
    : ["/banners/banner1.jpg", "/banners/banner2.jpg"];

  return (
    <div className="banner-container">
      <Carousel
        key={isMobile ? "mobile" : "desktop"}
        autoPlay
        infiniteLoop
        interval={5000}
        transitionTime={1200}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        showIndicators={false}
        swipeable={!isMobile}
      >
        {banners.map((src, index) => (
          <div key={index}>
            <img src={process.env.PUBLIC_URL + src} alt={`Banner ${index + 1}`} onContextMenu={(e) => e.preventDefault()}/>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default BannerCarousel;
