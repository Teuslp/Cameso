import React from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./BannerCarousel.css";


function BannerCarousel() {
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
                transitionTime={1200}>

                <div>
                    <img src="/banners/banner1.jpg" alt="" />
                </div>
                <div>
                    <img src="/banners/banner2.jpg" alt="" />
                </div>

            </Carousel>


        </div>
    )
}

export default BannerCarousel;