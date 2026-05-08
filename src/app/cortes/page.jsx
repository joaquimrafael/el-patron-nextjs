import Card from "@/components/card/Card";
import CardList from "@/components/cardList/CardList";
import SearchBar from "@/components/searchBar/SearchBar";
import { getHaircuts } from "@/lib/haircuts";

export const metadata = {
  title: "Cortes",
};

export default async function HairStylesPage() {
  const items = await getHaircuts();

  return (
    <main className="list-page">
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
