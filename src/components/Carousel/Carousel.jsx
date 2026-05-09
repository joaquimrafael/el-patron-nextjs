"use client";

import CarouselButton from "@/components/CarouselButton/CarouselButton";
import styles from "@/components/Carousel/carousel.module.css";
import { useState } from "react";

export default function Carousel({ imagesList }) {
  if (!imagesList) return <></>;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function moveCarousel(direction) {
    setCurrentImageIndex(
      (prev) => (prev + direction + imagesList.length) % imagesList.length,
    );
  }

  return (
    <div className={styles.carousel}>
      <CarouselButton
        carouselFunction={() => moveCarousel(-1)}
        direction="left"
      />

      <div className={styles.imageContainer}>
        <img
          src={imagesList[currentImageIndex]}
          alt={`Imagem ${currentImageIndex + 1}`}
        />
      </div>

      <CarouselButton
        carouselFunction={() => moveCarousel(1)}
        direction="right"
      />
    </div>
  );
}
