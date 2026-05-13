/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "El Patron",
  icons: {
    icon: "/imgs/elpatron.jpg",
  },
};

const pageSections = [
  { link: "/#home", label: "Home" },
  { link: "/#about", label: "Sobre nós" },
  { link: "/#structure", label: "Estrutura" },
  { link: "/#services", label: "Serviços" },
  { link: "/#contact-us", label: "Fale conosco" },
  { link: "/#localization", label: "Localização" },
  { link: "/equipe", label: "Equipe" },
  { link: "/cortes", label: "Cortes" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=chevron_left,chevron_right,search"
        />
      </head>
      <body>
        <Navbar sections={pageSections} />

        {children}

        <footer>
          <ul>
            <li>
              <a href="/#home">Home</a>
            </li>
            <li>
              <a href="/#about">Sobre nós</a>
            </li>
            <li>
              <a href="/#structure">Estrutura</a>
            </li>
            <li>
              <a href="/#services">Serviços</a>
            </li>
            <li>
              <a href="/#localization">Localização</a>
            </li>
            <li>
              <a href="/#contact-us">Fale conosco</a>
            </li>
            <li>
              <a href="tel:+">+55 (11) 9999-9999</a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/barbeariaelpatron___/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li className="">
              <a href="/equipe">Equipe</a>
            </li>
            <li className="">
              <a href="/cortes">Cortes</a>
            </li>
          </ul>
        </footer>
      </body>
    </html>
  );
}
