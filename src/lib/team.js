const team = [
  {
    id: "joao-silva",
    name: "João Silva",
    role: "Barbeiro Sênior",
    image: "/imgs/Screenshot 2026-04-02 at 21.26.09.png",
  },
  {
    id: "pedro-oliveira",
    name: "Pedro Oliveira",
    role: "Especialista em Barba",
    image: "/imgs/Screenshot 2026-04-02 at 21.26.17.png",
  },
  {
    id: "carlos-santos",
    name: "Carlos Santos",
    role: "Barbeiro",
    image: "/imgs/Screenshot 2026-04-02 at 21.26.41.png",
  },
  {
    id: "marcos-lima",
    name: "Marcos Lima",
    role: "Aprendiz",
    image: "/imgs/Screenshot 2026-04-02 at 21.36.14.png",
  },
];

export async function getTeam() {
  return team;
}
