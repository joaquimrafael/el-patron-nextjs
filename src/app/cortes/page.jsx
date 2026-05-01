export const metadata = {
  title: 'Cortes',
};

export default function HairStylesPage() {
  return (
    <>
      <h1>Nossos estilos de Cortes</h1>
      <section id="services">
          <h2>Serviços</h2>
          <section>
            <article className="services-article-card">
              <img
                src="/imgs/Screenshot 2026-04-02 at 21.26.09.png"
                alt="Img 4"
              />
              <div className="services-article-text-box">
                <h3>Corte Americano</h3>
                <p>
                  Cortes modernos ou clássicos, adaptados ao seu estilo. Nossos
                  barbeiros utilizam as melhores técnicas para garantir um
                  resultado impecável e duradouro, do degradê ao corte social.
                </p>
              </div>
            </article>
            <article className="services-article-card">
              <img
                src="/imgs/Screenshot 2026-04-02 at 21.26.17.png"
                alt="Serviço de barba"
              />
              <div className="services-article-text-box">
                <h3>Corte do Jaca</h3>
                <p>
                  Aparagem e modelagem de barba com navalha, toalha quente e
                  produtos premium. Cuide da sua barba com quem realmente
                  entende do assunto.
                </p>
              </div>
            </article>
            <article className="services-article-card">
              <img
                src="/imgs/Screenshot 2026-04-02 at 21.26.41.png"
                alt="Combo corte e barba"
              />
              <img
                src="/imgs/Screenshot 2026-04-02 at 21.36.26.png"
                alt="Combo corte e barba"
              />
              <div className="services-article-text-box">
                <h3>Combo Corte + Barba</h3>
                <p>
                  O pacote completo para quem quer sair da barbearia totalmente
                  renovado. Corte de cabelo e tratamento de barba com todo o
                  cuidado que você merece.
                </p>
              </div>
            </article>
          </section>
      </section>
    </>
  );
}
