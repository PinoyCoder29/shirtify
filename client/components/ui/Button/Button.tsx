"use client";

import { useRouter } from "next/navigation";
import styles from "./style.module.css";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  to?: string;
  variant?: "primary" | "login" | "signup";
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  className = "",
  to,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const router = useRouter();

  return (
    <button
      type={type}
      className={`${styles.uiButton} ${styles[variant]} ${className}`}
      onClick={() => to && router.push(to)}
    >
      {children}
    </button>
  );
}
