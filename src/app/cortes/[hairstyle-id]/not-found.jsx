import styles from "@/app/cortes/[hairstyle-id]/notFound.module.css";
import MediumButton from "@/components/MediumButton/MediumButton";

export default function HairStyleNotFound() {
  return (
    <main className={styles.detailPage}>
      <h1>Corte não encontrado</h1>
      <p>O corte que você procura não está no nosso catálogo.</p>
      <MediumButton href="/cortes" text="Voltar aos cortes" />
    </main>
  );
}
