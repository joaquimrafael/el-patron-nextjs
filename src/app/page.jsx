/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

"use client";

import MediumButton from "@/components/MediumButton/MediumButton";
import LargeButton from "@/components/LargeButton/LargeButton";
import Carousel from "@/components/Carousel/Carousel";
import styles from "@/app/page.module.css";

/* eslint-disable @next/next/no-img-element */

const imgList = [
  "/imgs/Screenshot 2026-04-02 at 21.27.30.png",
  "/imgs/Screenshot 2026-04-02 at 21.28.09.png",
  "/imgs/Screenshot 2026-04-02 at 21.28.39.png",
  "/imgs/Screenshot 2026-04-02 at 21.40.22.png",
  "/imgs/Screenshot 2026-04-02 at 21.45.51.png",
];

function saveToLocalStorage(newData) {
  try {
    const currentData = JSON.parse(localStorage.getItem("messages")) || [];
    currentData.push(newData);
    localStorage.setItem("messages", JSON.stringify(currentData));
  } catch (err) {
    console.error("Erro ao salvar no localStorage: ", err);
  }
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
      <main className={styles.main}>
        <section className={styles.home} id="home">
          <video
            width="640"
            autoPlay
            muted
            loop
            disablePictureInPicture
            className={styles.bgVideo}
          >
            <source
              src="/videos/YTDown.com_YouTube_Fire-Barber-Shop-Promo-ATLMDERON_Media_GSc3uAm8rQ_001_1080p.mp4"
              type="video/mp4"
            />
          </video>

          <div className={styles.fadeBottom}></div>
          <div className={styles.overlay}></div>

          <a href="">
            <img
              src="/imgs/elpatron.jpg"
              className={styles.coreImg}
              alt="Logo Grande"
            />
          </a>
        </section>

        <section className={styles.about} id="about">
          <article className={styles.aboutArticleCard}>
            <img
              src="/imgs/Screenshot 2026-04-02 at 21.36.14.png"
              className={styles.coreImg}
              alt="Sobre nós"
            />
            <div className={styles.aboutTextBox}>
              <h2>Sobre nós</h2>
              <p>
                A El Patron é uma barbearia que une tradição e estilo moderno.
                Aqui, cada corte é feito com precisão e cuidado por barbeiros
                experientes que entendem que aparência é identidade. Venha nos
                conhecer e saia como um verdadeiro patrão.
              </p>
              <MediumButton text="Conheça o time" href="/equipe" />
            </div>
          </article>
        </section>

        <section className={styles.structure} id="structure">
          <h2>Estrutura e espaço físico</h2>
          <Carousel imagesList={imgList} />
        </section>

        <section className={styles.services} id="services">
          <h2>Serviços</h2>
          <div>
            <article className={styles.servicesArticleCard}>
              <img
                src="/imgs/Screenshot 2026-04-02 at 21.26.09.png"
                alt="Img 4"
              />
              <div className={styles.servicesArticleTextBox}>
                <h3>Corte de Cabelo</h3>
                <p>
                  Cortes modernos ou clássicos, adaptados ao seu estilo. Nossos
                  barbeiros utilizam as melhores técnicas para garantir um
                  resultado impecável e duradouro, do degradê ao corte social.
                </p>
              </div>
            </article>
            <article className={styles.servicesArticleCard}>
              <img
                src="/imgs/Screenshot 2026-04-02 at 21.26.17.png"
                alt="Serviço de barba"
              />
              <div className={styles.servicesArticleTextBox}>
                <h3>Barba</h3>
                <p>
                  Aparagem e modelagem de barba com navalha, toalha quente e
                  produtos premium. Cuide da sua barba com quem realmente
                  entende do assunto.
                </p>
              </div>
            </article>
            <article className={styles.servicesArticleCard}>
              <img
                src="/imgs/Screenshot 2026-04-02 at 21.26.41.png"
                alt="Combo corte e barba"
              />
              <img
                src="/imgs/Screenshot 2026-04-02 at 21.36.26.png"
                alt="Combo corte e barba"
              />
              <div className={styles.servicesArticleTextBox}>
                <h3>Combo Corte + Barba</h3>
                <p>
                  O pacote completo para quem quer sair da barbearia totalmente
                  renovado. Corte de cabelo e tratamento de barba com todo o
                  cuidado que você merece.
                </p>
              </div>
            </article>
          </div>
          <div className={styles.servicesCta}>
            <LargeButton text="Saiba mais" href="/cortes" />
          </div>
        </section>

        <section className={styles.contactUs} id="contact-us">
          <h2>Fale conosco</h2>
          <form id="contact-form" onSubmit={sendMessage}>
            <input
              type="text"
              id="full-name"
              name="full-name"
              placeholder="Nome Completo*"
              required
              className={styles.textInput}
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email*"
              required
              className={styles.textInput}
            />
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Telefone"
              className={styles.textInput}
            />
            <textarea
              name="message"
              id="message"
              placeholder="Mensagem*"
              required
              className={styles.textAreaInput}
            ></textarea>
            <LargeButton text="Enviar" />
          </form>
        </section>

        <section className={styles.localization} id="localization">
          <div className={styles.localizationText}>
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
