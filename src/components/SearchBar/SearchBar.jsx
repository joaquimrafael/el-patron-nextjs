import styles from "@/components/SearchBar/searchBar.module.css";

export default function SearchBar({ placeholder = "Buscar..." }) {
  return (
    <label className={styles.searchBar}>
      <span
        className={`material-symbols-outlined ${styles.materialSymbolsOutlined}`}
      >
        search
      </span>
      <input type="search" placeholder={placeholder} />
    </label>
  );
}
