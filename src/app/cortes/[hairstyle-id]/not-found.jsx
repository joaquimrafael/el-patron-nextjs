import Link from "next/link";

export default function HairStyleNotFound() {
  return (
    <main className="detail-page">
      <h1>Corte não encontrado</h1>
      <p>O corte que você procura não está no nosso catálogo.</p>
      <Link href="/cortes" className="medium-button">
        Voltar aos cortes
      </Link>
    </main>
  );
}
