import React from "react";
import BannerCarousel from "../components/BannerCarousel/BannerCarousel";
import Topics from "../components/Topics/Topics";
import Photos from "../components/Photos/Photos";
import Collaborators from "../components/Collaborators/Collaborators";
import Partners from "../components/Partners/Partners";
import Channel from "../components/Channel/Channel";
import { color } from "framer-motion";

function HomePage() {
  return (
    <main 
    style={{
        background: "#f4f4f4",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
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