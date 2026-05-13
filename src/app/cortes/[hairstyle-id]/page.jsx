/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import HaircutDetail from "@/components/HaircutDetail/HaircutDetail";
import { getHaircut } from "@/lib/haircuts";
import styles from "@/app/cortes/[hairstyle-id]/page.module.css";

export default function HairStyleDetailPage() {
  const { "hairstyle-id": id } = useParams();

  const [haircut, setHaircut] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    getHaircut(id, { signal: controller.signal })
      .then((data) => {
        if (data === null) setMissing(true);
        else setHaircut(data);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  if (missing) notFound();

  if (loading) {
    return (
      <main className={styles.statusPage}>
        <p>Carregando corte…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.statusPage}>
        <h1>Não foi possível carregar o corte</h1>
        <p>{error}</p>
      </main>
    );
  }

  if (!haircut) return null;

  return <HaircutDetail haircut={haircut} />;
}
