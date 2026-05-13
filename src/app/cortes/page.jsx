/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

import Card from "@/components/Card/Card";
import CardList from "@/components/CardList/CardList";
import SearchBar from "@/components/SearchBar/SearchBar";
import { getHaircuts } from "@/lib/haircuts";
import styles from "@/app/cortes/page.module.css";

export const metadata = {
  title: "Cortes",
};

export default async function HairStylesPage() {
  const items = await getHaircuts();

  return (
    <main className={styles.listPage}>
      <h1>Nossos Cortes</h1>

      <SearchBar placeholder="Buscar corte..." />

      <CardList>
        {items.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            image={item.image}
            href={`/cortes/${item.id}`}
          />
        ))}
      </CardList>
    </main>
  );
}
