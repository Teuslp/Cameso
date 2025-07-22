import React from "react";
import BannerCarousel from "../components/BannerCarousel/BannerCarousel";
import Topics from "../components/Topics/Topics";
import Photos from "../components/Photos/Photos";
import Collaborators from "../components/Collaborators/Collaborators";
import Partners from "../components/Partners/Partners";
import Channel from "../components/Channel/Channel";

function HomePage() {
  return (
    <main>
      <BannerCarousel />
      <Topics />
      <Photos />
      <Collaborators />
      <Partners />
      <Channel />
    </main>
  );
}

export default HomePage;