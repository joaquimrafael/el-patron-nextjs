/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import CardList from "@/components/CardList/CardList";
import SearchBar from "@/components/SearchBar/SearchBar";
import { getHaircuts } from "@/lib/haircuts";
import styles from "@/app/cortes/page.module.css";

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export default function HairStylesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    getHaircuts({ signal: controller.signal })
      .then(setItems)
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const filtered = items.filter((item) =>
    normalize(item.name).includes(normalize(query.trim())),
  );

  return (
    <main className={styles.listPage}>
      <h1>Nossos Cortes</h1>

      <SearchBar
        placeholder="Buscar corte..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Carregando cortes…</p>}
      {error && <p>Não foi possível carregar os cortes: {error}</p>}

      {!loading && !error && query.trim() && filtered.length === 0 && (
        <p>Nenhum corte encontrado para “{query}”.</p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <CardList>
          {filtered.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              image={item.image}
              href={`/cortes/${item.id}`}
            />
          ))}
        </CardList>
      )}
    </main>
  );
}
