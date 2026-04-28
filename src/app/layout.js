import "./globals.css";

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
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=chevron_left,chevron_right"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
