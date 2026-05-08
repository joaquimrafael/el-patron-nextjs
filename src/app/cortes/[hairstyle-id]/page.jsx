import { notFound } from "next/navigation";
import HaircutDetail from "@/components/haircutDetail/HaircutDetail";
import { getHaircut } from "@/lib/haircuts";

export default async function HairStyleDetailPage({ params }) {
  const { "hairstyle-id": id } = await params;
  const haircut = await getHaircut(id);

  if (!haircut) {
    notFound();
  }

  return <HaircutDetail haircut={haircut} />;
}
