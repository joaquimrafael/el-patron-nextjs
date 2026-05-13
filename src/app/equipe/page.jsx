/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

import Card from "@/components/Card/Card";
import CardList from "@/components/CardList/CardList";
import { getTeam } from "@/lib/team";
import styles from "@/app/equipe/page.module.css";

export const metadata = {
  title: "Equipe",
};

export default async function TeamPage() {
  const members = await getTeam();

  return (
    <main className={styles.listPage}>
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
