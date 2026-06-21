"use client";
import { UserNavlinks } from "@/components/config/UserNavlink";
import styles from "./style.module.css";
import Link from "next/link";
import { useState } from "react";
export default function Sidebar() {
  const [active, setActive] = useState("/home");
  return (
    <aside className={`d-none d-md-block ${styles.sidebar}`}>
      <ul className={`nav flex-column gap-2 ${styles.sidebarContent}`}>
        {UserNavlinks.map((item) => {
          return (
            <li key={item.path} className="nav-item">
              <a
                href={item.path}
                className={` nav-link d-flex gap-1 ${styles.navlink} ${active === item.path ? styles.active : ""} `}
                onClick={() => setActive(item.path)}
              >
                <i className={`bi ${item.icon}`}></i>
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
