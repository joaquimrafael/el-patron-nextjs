"use client";

/* eslint-disable @next/next/no-img-element */

function saveToLocalStorage(newData) {
  try {
    const currentData = JSON.parse(localStorage.getItem("messages")) || [];
    currentData.push(newData);
    localStorage.setItem("messages", JSON.stringify(currentData));
  } catch (err) {
    console.error("Erro ao salvar no localStorage: ", err);
  }
}

function moveCarousel(direction) {
  const imagesList = document.getElementsByClassName("carrousel-list")[0];

  const elements = imagesList.getElementsByTagName("li");

  let currIndex = Array.from(elements).findIndex((el) => el.id === "visible");
  elements[currIndex].removeAttribute("id");
  elements[(currIndex + direction + elements.length) % elements.length].id =
    "visible";
}

function carrouselLeftClick() {
  moveCarousel(-1);
}

function carrouselRightClick() {
  moveCarousel(1);
}

function sendMessage(event) {
  event.preventDefault();

  const form = document.getElementById("contact-form");

  const fullName = form.querySelector("#full-name").value.trim();
  const email = form.querySelector("#email").value.trim();
  const phone = form.querySelector("#phone").value.trim();
  const message = form.querySelector("#message").value.trim();

  const newData = {
    name: fullName,
    email: email,
    phone: phone,
    message: message,
  };

  saveToLocalStorage(newData);

  window.alert(
    `Obrigado pela mensagem, ${fullName}! Em breve, entraremos em contato por e-mail ou telefone!`,
  );

  form.reset();
}

export default function Home() {
  return (
    <>
      <main>
        <section id="home">
          <video
            width="640"
            autoPlay
            muted
            loop
            disablePictureInPicture
            className="bg-video"
          >
            <source
              src="/videos/YTDown.com_YouTube_Fire-Barber-Shop-Promo-ATLMDERON_Media_GSc3uAm8rQ_001_1080p.mp4"
              type="video/mp4"
            />
          </video>

          <div className="fade-bottom"></div>
          <div className="overlay"></div>

          <a href="">
            <img
              src="/imgs/elpatron.jpg"
              className="core-img"
              alt="Logo Grande"
            />
          </a>
        </section>

        <section id="about">
          <article className="about-article-card">
            <img
              src="/imgs/Screenshot 2026-04-02 at 21.36.14.png"
              className="core-img"
              alt="Sobre nós"
            />
            <div className="about-text-box">
              <h2>Sobre nós</h2>
              <p>
                A El Patron é uma barbearia que une tradição e estilo moderno.
                Aqui, cada corte é feito com precisão e cuidado por barbeiros
                experientes que entendem que aparência é identidade. Venha nos
                conhecer e saia como um verdadeiro patrão.
              </p>
              <button type="button" className="medium-button">
                Em breve...
              </button>
            </div>
          </article>
        </section>

        <section id="structure">
          <h2>Estrutura e espaço físico</h2>
          <div className="carrousel">
            <button
              type="button"
              className="carousel-button"
              onClick={carrouselLeftClick}
            >
              <span className="material-symbols-outlined"> chevron_left </span>
            </button>

            <ul className="carrousel-list">
              <li className="carrousel-img">
                <img
                  src="/imgs/Screenshot 2026-04-02 at 21.27.30.png"
                  alt="Foto 1"
                />
              </li>
              <li className="carrousel-img" id="visible">
                <img
                  src="/imgs/Screenshot 2026-04-02 at 21.28.09.png"
                  alt="Foto 2"
                />
              </li>
              <li className="carrousel-img">
                <img
                  src="/imgs/Screenshot 2026-04-02 at 21.40.22.png"
                  alt="Foto 3"
                />
              </li>
              <li className="carrousel-img">
                <img
                  src="/imgs/Screenshot 2026-04-02 at 21.45.51.png"
                  alt="Foto 4"
                />
              </li>
            </ul>
            <button
              type="button"
              className="carousel-button"
              onClick={carrouselRightClick}
            >
              <span className="material-symbols-outlined"> chevron_right </span>
            </button>
          </div>
        </section>

        <section id="services">
          <h2>Serviços</h2>
          <section>
            <article className="services-article-card">
              <img
                src="/imgs/Screenshot 2026-04-02 at 21.26.09.png"
                alt="Img 4"
              />
              <div className="services-article-text-box">
                <h3>Corte de Cabelo</h3>
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
                <h3>Barba</h3>
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

        <section id="contact-us">
          <h2>Fale conosco</h2>
          <form id="contact-form" onSubmit={sendMessage}>
            <input
              type="text"
              id="full-name"
              name="full-name"
              placeholder="Nome Completo*"
              required
              className="text-input"
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email*"
              required
              className="text-input"
            />
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Telefone"
              className="text-input"
            />
            <textarea
              name="message"
              id="message"
              placeholder="Mensagem*"
              required
              className="text-area-input"
            ></textarea>
            <button type="submit" className="large-button">
              Enviar
            </button>
          </form>
        </section>

        <section id="localization">
          <div className="localization-text">
            <h2>Localização</h2>
            <address>Avenida lider 2465B, São Paulo, Brazil</address>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11282.270675714386!2d-46.48196199260112!3d-23.538852741926593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce674771ef29ed%3A0x9f99c75620581425!2sBarbearia%20El%20Patron!5e0!3m2!1sen!2sbr!4v1774555164360!5m2!1sen!2sbr"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </main>
    </>
  );
}
