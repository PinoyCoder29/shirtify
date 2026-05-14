import { Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import "./globals.css";
import Sidebar from "@/components/layout/Sidebar/page";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="container-fluid">
          <div className="row bg-dark">
            <div className="col-md-10 ">{children}</div>
            <div className="col-md-2">
              <Sidebar />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
