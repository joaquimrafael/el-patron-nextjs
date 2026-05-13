/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

import styles from "@/components/Tag/tag.module.css";

export default function Tag({ name }) {
  const body = (
    <button type="button" className={styles.tagButton}>
      {name}
    </button>
  );

  return <li className={styles.tag}>{body}</li>;
}
