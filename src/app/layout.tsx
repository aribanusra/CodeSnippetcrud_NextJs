import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'antialiased'}  >
        <div className="container mx-auto p-12">
        {children}

        </div>
      </body>
    </html>
  );
}
