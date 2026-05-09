import styles from "@/components/Tag/tag.module.css";

export default function Tag({ name }) {
  const body = (
    <button type="button" className={styles.tagButton}>
      {name}
    </button>
  );

  return <li className={styles.tag}>{body}</li>;
}
