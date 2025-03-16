import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "PWA For Prodyogiki",
  description: "Developed by ISTE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className="min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('/mobilebg.jpg')",
        }}
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md"
          style={{
            WebkitBackdropFilter: "blur(10px)",
          }}
        ></div>
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
