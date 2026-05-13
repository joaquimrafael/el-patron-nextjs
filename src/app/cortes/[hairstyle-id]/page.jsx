/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

import { notFound } from "next/navigation";
import HaircutDetail from "@/components/HaircutDetail/HaircutDetail";
import { getHaircut } from "@/lib/haircuts";

export default async function HairStyleDetailPage({ params }) {
  const { "hairstyle-id": id } = await params;
  const haircut = await getHaircut(id);

  if (!haircut) {
    notFound();
  }

  return <HaircutDetail haircut={haircut} />;
}
