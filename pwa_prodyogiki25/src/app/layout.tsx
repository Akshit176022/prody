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
        className={`w-screen select-none flex justify-center items-center parent`}
      >
        <div className={`sm-container relative pb-[150px]`}>
          <div className="w-full h-full pb-[150px]">
            {children}
          </div>
        </div>

      </body>
    </html>
  );
}
