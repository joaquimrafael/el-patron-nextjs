/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

"use client";

import styles from "@/components/Hamburger/hamburger.module.css";

export default function Hamburger({ onClickFn }) {
  return (
    <img
      src="/imgs/burger-menu.png"
      className={styles.hamburgerButton}
      onClick={onClickFn}
      alt=""
    />
  );
}
