"use client";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";
export default function Sidebar() {
  const pathname = usePathname();
  const links = [
    { name: "Home", path: "/", icon: "bi-house-door" },
    { name: "About", path: "/about", icon: "" },
    { name: "Contact", path: "/contact", icon: "" },
  ];
  return (
    <div className={styles.sidebar}>
      <ul className="nav flex-column">
        {links.map((item) => (
          <li key={item.path}>
            <a
              href={item.path}
              className={
                pathname === item.path
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }
            >
              <i className={`bi ${item.icon}`}> </i>
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
