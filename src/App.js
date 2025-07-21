import React from "react";
import Navbar from "./components/Navbar/Navbar";
import BannerCarousel from "./components/BannerCarousel/BannerCarousel";
import Topics from "./components/Topics/Topics";
import Photos from "./components/Photos/Photos";
import Collaborators from "./components/Collaborators/Collaborators";
import Partners from "./components/Partners/Partners";
import Channel from "./components/Channel/Channel";
import Footer from "./components/Footer/Footer";

  function App() {
    return (
      <div >
        <Navbar />
        <BannerCarousel />
        <Topics />
        <Photos />
        <Collaborators />
        <Partners />
        <Channel />
        <Footer />
      </div>
    );
  }

export default App;