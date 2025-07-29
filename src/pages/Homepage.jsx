import React from "react";
import BannerCarousel from "../components/BannerCarousel/BannerCarousel";
import Topics from "../components/Topics/Topics";
import Photos from "../components/Photos/Photos";
import Collaborators from "../components/Collaborators/Collaborators";
import Partners from "../components/Partners/Partners";
import Channel from "../components/Channel/Channel";
import Feedback from "../components/Feedback/Feedback";
import { color } from "framer-motion";

function HomePage() {
  return (
    <main 
    style={{
        background: "#f8f8f8",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
      <BannerCarousel />
      <Topics />
      <Photos />
      <Collaborators />
      <Feedback />
      <Partners />
      <Channel />
    </main>
  );
}

export default HomePage;