import styles from "@/components/LargeButton/large-button.module.css";

export default function LargeButton({ text, href }) {
  return (
    <Link
      className={`${styles.base} ${styles.large} ${styles.largeButton}`}
      href={href}
    >
      {text}
    </Link>
  );
}
