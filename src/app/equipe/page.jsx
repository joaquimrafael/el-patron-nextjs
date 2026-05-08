import Card from "@/components/card/Card";
import CardList from "@/components/cardList/CardList";
import { getTeam } from "@/lib/team";

export const metadata = {
  title: "Equipe",
};

export default async function TeamPage() {
  const members = await getTeam();

  return (
    <main className="list-page">
      <h1>Nossa Equipe</h1>

      <CardList>
        {members.map((member) => (
          <Card
            key={member.id}
            name={member.name}
            image={member.image}
            subtitle={member.role}
          />
        ))}
      </CardList>
    </main>
  );
}
