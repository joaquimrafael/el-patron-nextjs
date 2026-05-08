import Link from "next/link";
import styles from "@/components/MediumButton/medium-button.module.css";

export default function MediumButton({ text, href = "/" }) {
  return (
    <Link
      className={`${styles.base} ${styles.medium} ${styles.mediumButton}`}
      href={href}
    >
      {text}
    </Link>
  );
}
