import Image from "next/image";
import TagList from "@/components/tagList/TagList";
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
