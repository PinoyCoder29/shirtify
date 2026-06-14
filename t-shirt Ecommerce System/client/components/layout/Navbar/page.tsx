"use client";

import { Navlinks } from "@/components/config/Navlink";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";
import { Mobilelinks } from "@/components/config/Mobilelink";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`d-none d-md-block navbar navbar-expand-md ${styles.navbar} navbar-dark`}
      >
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">
            <img
              src="/logo.png"
              alt="logo"
              className={`img-fluid ${styles.logo}`}
            />
          </Link>

          <ul className="navbar-nav mx-auto">
            {Navlinks.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  href={item.path}
                  className={` ${styles.navlink} ${isActive(item.path) ? styles.active : ""}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/* mobile */}
      <nav className="navbar navbar-expand-md border-top d-md-none fixed-bottom">
        <ul className="navbar-nav flex-row w-100 d-flex justify-content-around">
          {Mobilelinks.map((item) => {
            return (
              <a href="" key={item.path}>
                <i className={`bi ${item.icon}`}></i>
              </a>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
