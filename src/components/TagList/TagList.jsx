/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

import styles from "@/components/TagList/tagList.module.css";

export default function TagList({ children }) {
  return <ul className={styles.tagList}>{children}</ul>;
}
