import styles from "@/components/CardList/cardList.module.css";

export default function CardList({ children }) {
  return <ul className={styles.cardList}>{children}</ul>;
}
