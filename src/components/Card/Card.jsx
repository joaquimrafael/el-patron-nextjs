/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

import Image from "next/image";
import Link from "next/link";
import styles from "@/components/Card/card.module.css";

export default function Card({ name, image, subtitle, href }) {
  const body = (
    <>
      <Image
        className={styles.cardImg}
        src={image}
        alt={name}
        width={420}
        height={458}
      />
      <div className={styles.cardLabel}>
        <span className={styles.cardTitle}>{name}</span>
        {subtitle && <span className={styles.cardSubtitle}>{subtitle}</span>}
      </div>
    </>
  );

  return (
    <li className={styles.card}>
      {href ? <Link href={href}>{body}</Link> : body}
    </li>
  );
}
