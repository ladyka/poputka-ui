import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./components/ReactQueryProvider";
import ThemeRegistry from "./components/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poputka.by",
  description: "Poputka.by",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
