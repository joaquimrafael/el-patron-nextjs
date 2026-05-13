/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

import styles from "@/components/SearchBar/searchBar.module.css";

export default function SearchBar({ placeholder = "Buscar...", value, onChange }) {
  return (
    <label className={styles.searchBar}>
      <span
        className={`material-symbols-outlined ${styles.materialSymbolsOutlined}`}
      >
        search
      </span>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
