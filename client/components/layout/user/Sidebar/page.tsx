"use client";
import { UserNavlinks } from "@/components/config/UserNavlink";
import styles from "./style.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  name: string;
  path: string;
  icon: string;
};
type sidebarProps = {
  links: NavItem[];
};

export default function Sidebar({ links }: sidebarProps) {
  const pathname = usePathname();
  return (
    <aside className={`d-none d-md-block ${styles.sidebar}`}>
      <ul className={`nav flex-column gap-2 ${styles.sidebarContent}`}>
        {links.map((item) => {
          return (
            <li key={item.path} className="nav-item">
              <a
                href={item.path}
                className={` nav-link d-flex gap-1 ${styles.navlink} ${pathname === item.path ? styles.active : ""} `}
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
