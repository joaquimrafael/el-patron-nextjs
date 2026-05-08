/* eslint-disable @next/next/no-img-element */
import ".src/components/serviceCard/serviceCard.css";
const services = [
  {
    id: "corte-cabelo",
    title: "Corte de Cabelo",
    description:
      "Cortes modernos ou clássicos, adaptados ao seu estilo. Nossos barbeiros utilizam as melhores técnicas para garantir um resultado impecável e duradouro, do degradê ao corte social.",
    images: [
      { src: "/imgs/Screenshot 2026-04-02 at 21.26.09.png", alt: "Corte de cabelo" },
    ],
  },
  {
    id: "barba",
    title: "Barba",
    description:
      "Aparagem e modelagem de barba com navalha, toalha quente e produtos premium. Cuide da sua barba com quem realmente entende do assunto.",
    images: [
      { src: "/imgs/Screenshot 2026-04-02 at 21.26.17.png", alt: "Serviço de barba" },
    ],
  },
  {
    id: "combo",
    title: "Combo Corte + Barba",
    description:
      "O pacote completo para quem quer sair da barbearia totalmente renovado. Corte de cabelo e tratamento de barba com todo o cuidado que você merece.",
    images: [
      { src: "/imgs/Screenshot 2026-04-02 at 21.26.41.png", alt: "Combo corte e barba" },
      { src: "/imgs/Screenshot 2026-04-02 at 21.36.26.png", alt: "Combo corte e barba" },
    ],
  },
];

function ServiceCard({ title, description, images }) {
  return (
    <article className="services-article-card">
      {images.map((image) => (
        <img key={image.src} src={image.src} alt={image.alt} />
      ))}
      <div className="services-article-text-box">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export function ServicesSection() {
  return (
    <section id="services">
      <h2>Serviços</h2>
      <section>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            images={service.images}
          />
        ))}
      </section>
    </section>
  );
}
