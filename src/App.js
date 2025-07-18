import React from "react";
import Navbar from "./components/Navbar/Navbar";
import BannerCarousel from "./components/BannerCarousel/BannerCarousel";
import Topics from "./components/Topics/Topics";
import Photos from "./components/Photos/Photos";

  function App() {
    return (
      <div >
        <Navbar />
        <BannerCarousel />
        <Topics />
        <Photos />
      </div>
    );
  }

export default App;