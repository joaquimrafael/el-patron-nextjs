/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

import styles from "@/components/CarouselButton/carouselButton.module.css";

export default function CarouselButton({ carouselFunction, direction }) {
  const buttonDirection = "chevron_" + direction;

  return (
    <button
      type="button"
      className={styles.carouselButton}
      onClick={carouselFunction}
    >
      <span
        className={`material-symbols-outlined ${styles.materialSymbolsOutlined}`}
      >
        {buttonDirection}
      </span>
    </button>
  );
}
