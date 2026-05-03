import Image from "next/image";
import Link from "next/link";

const haircuts = [
  {
    id: "americano",
    name: "Corte Americano",
    image: "/imgs/Screenshot 2026-04-02 at 21.26.09.png",
  },
  {
    id: "jaca",
    name: "Corte do Jaca",
    image: "/imgs/Screenshot 2026-04-02 at 21.26.17.png",
  },
  {
    id: "combo",
    name: "Combo Corte + Barba",
    image: "/imgs/Screenshot 2026-04-02 at 21.26.41.png",
  },
  {
    id: "fade",
    name: "Fade Clássico",
    image: "/imgs/general-img-square.png",
  },
];

async function getHaircuts() {
  return haircuts;
}

export const metadata = {
  title: "Cortes",
};

export default async function HairStylesPage() {
  const items = await getHaircuts();

  return (
    <main className="list-page">
      <h1>Nossos Cortes</h1>

      <label className="search-bar">
        <span className="material-symbols-outlined">search</span>
        <input type="search" placeholder="Buscar corte..." />
      </label>

      <ul className="card-list">
        {items.map((item) => (
          <li key={item.id} className="card">
            <Link href={`/cortes/${item.id}`}>
              <Image
                className="card-img"
                src={item.image}
                alt={item.name}
                width={420}
                height={458}
              />
              <div className="card-label">
                <span className="card-title">{item.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
