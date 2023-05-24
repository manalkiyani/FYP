import React from "react";
import { MainHeader } from "./MainHeader";
import { MainFeatures } from "./MainFeatures";
import { MainServices } from "./MainServices";
import Video from "./Video";
import { MainPhotos } from "./MainPhotos";
import { Footer } from "./Footer";

const HomePage = () => {
  return (
    <div>
      <MainHeader />

      <MainFeatures />
      <Video />

      <MainPhotos />
      <Footer />
    </div>
  );
};

export default HomePage;
