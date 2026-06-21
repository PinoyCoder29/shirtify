import Navbar from "@/components/layout/Navbar/page";
import Header from "@/components/layout/user/Header/page";
import Sidebar from "@/components/layout/user/Sidebar/page";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
    </>
  );
}
