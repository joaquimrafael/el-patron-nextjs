/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

const API_URL =
  process.env.NEXT_PUBLIC_HAIRSTYLE_API_URL ?? "http://localhost:8080";

function adapt(haircut) {
  return {
    id: haircut.id,
    name: haircut.name,
    image: haircut["mainImage"],
    description: haircut.description,
    tags: haircut.tags ?? [],
  };
}

export async function getHaircuts({ signal } = {}) {
  const res = await fetch(`${API_URL}/api/hairstyles`, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.map(adapt);
}

export async function getHaircut(id, { signal } = {}) {
  const res = await fetch(`${API_URL}/api/hairstyle/${id}`, { signal });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return adapt(data);
}
