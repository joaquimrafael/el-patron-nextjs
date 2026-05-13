/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

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
