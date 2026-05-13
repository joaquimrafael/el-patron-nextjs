/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

import Image from "next/image";
import TagList from "@/components/TagList/TagList";
import Tag from "../Tag/Tag";
import styles from "@/components/HaircutDetail/haircutDetail.module.css";

export default function HaircutDetail({ haircut }) {
  return (
    <main className={styles.detailPage}>
      <h1>{haircut.name}</h1>

      <div className={styles.detailSummary}>
        <Image
          className={styles.detailImg}
          src={haircut.image}
          alt={haircut.name}
          width={500}
          height={500}
        />
        <TagList>
          {haircut.tags.map((item, idx) => (
            <Tag key={idx} name={item} />
          ))}
        </TagList>
      </div>

      <p>{haircut.description}</p>
    </main>
  );
}
