import "./globals.css";

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
          backgroundImage: "url('background.webp')",
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
