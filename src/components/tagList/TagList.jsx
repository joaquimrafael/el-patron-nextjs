import styles from "@/components/tagList/tagList.module.css";

export default function TagList({ children }) {
  return <ul className={styles.tagList}>{children}</ul>;
}
