/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

import styles from "@/components/CardList/cardList.module.css";

export default function CardList({ children }) {
  return <ul className={styles.cardList}>{children}</ul>;
}
