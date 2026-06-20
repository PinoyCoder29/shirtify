import Navbar from "@/components/layout/Navbar/page";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
