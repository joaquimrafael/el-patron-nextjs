/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

const haircuts = [
  {
    id: "americano",
    name: "Corte Americano",
    image: "/imgs/Screenshot 2026-04-02 at 21.26.09.png",
    description:
      "Corte clássico de inspiração norte-americana, com laterais bem marcadas e topo com volume. Combina precisão na máquina e finalização na tesoura, garantindo um visual limpo e versátil para o dia a dia.",
    tags: ["Clássico", "Degradê", "Curto"],
  },
  {
    id: "jaca",
    name: "Corte do Jaca",
    image: "/imgs/Screenshot 2026-04-02 at 21.26.17.png",
    description:
      "Estilo autoral da casa, com laterais raspadas e topo levemente desfiado. Pensado para quem busca um corte marcante, prático de manter e que valoriza o formato natural do rosto.",
    tags: ["Autoral", "Moderno", "Médio"],
  },
  {
    id: "combo",
    name: "Combo Corte + Barba",
    image: "/imgs/Screenshot 2026-04-02 at 21.26.41.png",
    description:
      "Pacote completo: corte de cabelo personalizado e tratamento de barba com toalha quente, óleos premium e finalização com navalha. Ideal para sair da barbearia totalmente renovado.",
    tags: ["Combo", "Barba", "Completo"],
  },
  {
    id: "fade",
    name: "Fade Clássico",
    image: "/imgs/general-img-square.png",
    description:
      "Degradê suave da nuca até o topo, executado em diferentes alturas (low, mid, high) conforme o seu estilo. O fade clássico é a base de quem gosta de manter o visual sempre alinhado.",
    tags: ["Fade", "Degradê", "Moderno"],
  },
];

export async function getHaircuts() {
  return haircuts.map(({ id, name, image }) => ({ id, name, image }));
}

export async function getHaircut(id) {
  return haircuts.find((haircut) => haircut.id === id) ?? null;
}
