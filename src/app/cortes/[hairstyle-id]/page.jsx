import Image from "next/image";
import { notFound } from "next/navigation";

const haircuts = {
  americano: {
    name: "Corte Americano",
    image: "/imgs/Screenshot 2026-04-02 at 21.26.09.png",
    description:
      "Corte clássico de inspiração norte-americana, com laterais bem marcadas e topo com volume. Combina precisão na máquina e finalização na tesoura, garantindo um visual limpo e versátil para o dia a dia.",
    tags: ["Clássico", "Degradê", "Curto"],
  },
  jaca: {
    name: "Corte do Jaca",
    image: "/imgs/Screenshot 2026-04-02 at 21.26.17.png",
    description:
      "Estilo autoral da casa, com laterais raspadas e topo levemente desfiado. Pensado para quem busca um corte marcante, prático de manter e que valoriza o formato natural do rosto.",
    tags: ["Autoral", "Moderno", "Médio"],
  },
  combo: {
    name: "Combo Corte + Barba",
    image: "/imgs/Screenshot 2026-04-02 at 21.26.41.png",
    description:
      "Pacote completo: corte de cabelo personalizado e tratamento de barba com toalha quente, óleos premium e finalização com navalha. Ideal para sair da barbearia totalmente renovado.",
    tags: ["Combo", "Barba", "Completo"],
  },
  fade: {
    name: "Fade Clássico",
    image: "/imgs/general-img-square.png",
    description:
      "Degradê suave da nuca até o topo, executado em diferentes alturas (low, mid, high) conforme o seu estilo. O fade clássico é a base de quem gosta de manter o visual sempre alinhado.",
    tags: ["Fade", "Degradê", "Moderno"],
  },
};

async function getHaircut(id) {
  return haircuts[id] ?? null;
}

export default async function HairStyleDetailPage({ params }) {
  const { "hairstyle-id": id } = await params;
  const haircut = await getHaircut(id);

  if (!haircut) {
    notFound();
  }

  return (
    <main className="detail-page">
      <h1>{haircut.name}</h1>

      <div className="detail-summary">
        <Image
          className="detail-img"
          src={haircut.image}
          alt={haircut.name}
          width={500}
          height={500}
        />
        <ul className="tag-list">
          {haircut.tags.map((tag) => (
            <li key={tag}>
              <button type="button" className="tag">
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p>{haircut.description}</p>
    </main>
  );
}
