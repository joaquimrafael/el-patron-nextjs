/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

import styles from "@/app/cortes/[hairstyle-id]/not-found.module.css";
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
