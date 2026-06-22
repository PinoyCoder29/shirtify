import { AdminLinks } from "@/components/config/adminlink";
import Sidebar from "@/components/layout/user/Sidebar/page";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar links={AdminLinks} />
      {children}
    </div>
  );
}
