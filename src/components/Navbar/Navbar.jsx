/*
 * Gustavo Garabetti Munhoz — 10409258
 * João Pedro Rodrigues Vieira — 10403595
 * Joaquim Rafael Mariano Prieto Pereira — 10408805
 * Caio Yukio Yazawa — 10418604
 * Erick Guilherme de Macedo Cabral — 10419996
 */

"use client";

import Hamburger from "../Hamburger/Hamburger";
import styles from "@/components/Navbar/navbar.module.css";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Navbar({ sections }) {
  if (!sections) return <></>;

  const isDesktop = useMediaQuery({ minWidth: 768 });

  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

  function toggleNavbar() {
    if (isDesktop) return;

    setOpen((prev) => !prev);
  }

  return (
    <>
      <Hamburger onClickFn={toggleNavbar} />
      {open && (
        <div className={styles.navbarContainer}>
          <nav className={styles.nav}>
            <ul>
              {sections.map((section, idx) => (
                <li className={styles.navbarLink} key={idx}>
                  <a href={section.link} onClick={toggleNavbar}>
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
