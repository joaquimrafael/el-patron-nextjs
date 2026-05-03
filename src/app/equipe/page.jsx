import Image from "next/image";

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

async function getTeam() {
  return team;
}

export const metadata = {
  title: "Equipe",
};

export default async function TeamPage() {
  const members = await getTeam();

  return (
    <main className="list-page">
      <h1>Nossa Equipe</h1>

      <ul className="card-list">
        {members.map((member) => (
          <li key={member.id} className="card">
            <Image
              className="card-img"
              src={member.image}
              alt={member.name}
              width={420}
              height={458}
            />
            <div className="card-label">
              <span className="card-title">{member.name}</span>
              <span className="card-subtitle">{member.role}</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
