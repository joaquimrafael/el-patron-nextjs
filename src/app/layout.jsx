import "./globals.css";
import Hamburger from "./Hamburger";

export const metadata = {
  title: "El Patron",
  icons: {
    icon: "/imgs/elpatron.jpg",
  },
};

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
        <Hamburger />
        <header id="header-closed">
          <nav>
            <ul>
              <li className="navbar-link">
                <a href="/#home" /*onClick={toggleNavbar}*/>Home</a>
              </li>
              <li className="navbar-link">
                <a href="/#about" /*onClick={toggleNavbar}*/>Sobre nós</a>
              </li>
              <li className="navbar-link">
                <a href="/#structure" /*onClick={toggleNavbar}*/>Estrutura</a>
              </li>
              <li className="navbar-link">
                <a href="/#services" /*onClick={toggleNavbar}*/>Serviços</a>
              </li>
              <li className="navbar-link">
                <a href="/#contact-us" /*onClick={toggleNavbar}*/>
                  Fale conosco
                </a>
              </li>
              <li className="navbar-link">
                <a href="/#localization" /*onClick={toggleNavbar}*/>
                  Localização
                </a>
              </li>
              <li className="navbar-link">
                <a href="/equipe">Equipe</a>
              </li>
              <li className="navbar-link">
                <a href="/cortes">Cortes</a>
              </li>
            </ul>
          </nav>
        </header>

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
