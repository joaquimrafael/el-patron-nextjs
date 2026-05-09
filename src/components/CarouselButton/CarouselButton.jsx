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
