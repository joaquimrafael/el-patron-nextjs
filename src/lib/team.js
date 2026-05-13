/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

const team = [
  {
    id: "matheus-sanches",
    name: "Matheus-Sanches",
    role: "Barbeiro Junior",
    image: "/imgs/matheus.png",
  },
  {
    id: "raphael-rosas",
    name: "Raphael Rosas",
    role: "Especialista em Barba",
    image: "/imgs/raphael.png",
  },
  {
    id: "cristiano-rosa",
    name: "Cristiano Rosa",
    role: "Barbeira Sênior",
    image: "/imgs/cristiano.png",
  },
  {
    id: "ian-morais",
    name: "Ian Morais",
    role: "Aprendiz",
    image: "/imgs/ian.png",
  },
];

export async function getTeam() {
  return team;
}
